<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="fw-bold" data-cy="activity-title">Activity</h1>
      <button
        type="button"
        class="btn btn-primary fw-semibold fs-5 rounded-pill text-white"
        @click="addActivity"
        data-cy="activity-add-button"
      >
        <img src="@/assets/icon/icon-plus.svg" alt="add" />
        <!-- <add /> -->
        <span>Tambah</span>
      </button>
    </div>
    <div class="row mt-5">
      <div v-show="ListActivity.length == 0" class="text-center">
        <img src="@/assets/img/activity-empty-state.png" alt="add" />
      </div>
      <div
        v-show="ListActivity.length != 0"
        v-for="item in ListActivity"
        :key="item.id"
        class="col-3"
      >
        <div class="card mb-5" style="" data-cy="activity-item">
          <div class="card-body pointer-cursor" @click="gotoDetail(item.id)">
            <h5 class="card-title" data-cy="activity-item-title">{{ item.title }}</h5>
          </div>
          <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
            <span>{{ day(item.created_at) }}</span>
            <div
              class="pointer-cursor"
              @click="getActivityById(item)"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              data-cy="activity-item-delete-button"
            >
              <img src="@/assets/icon/icon-delete.svg" alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Delete item -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
    data-cy="modal-delete"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content py-4">
        <div class="modal-body text-center">
          <img src="@/assets/icon/icon-alert.svg" class="d-block mx-auto" alt="" />
          <span
            >Apakah anda yakin menghapus activity <b>"{{ stateById.title }}"</b> ?</span
          >
        </div>
        <div class="text-center">
          <button
            type="button"
            class="btn btn-secondary me-2"
            data-cy="modal-delete-cancel-button"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            @click="deleteActivity"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-danger"
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import day from '@/utils/day';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const ListActivity = ref([]);
    const stateById = reactive({
      id: null,
      title: '',
    });

    const gotoDetail = (id) => {
      router.push({
        name: 'detail',
        params: {
          idActivity: id,
        },
      });
    };

    const getListActivity = async () => {
      await axios
        .get('activity-groups/?email=rofiq@gmail.com')
        .then((response) => {
          // console.log(response.data);
          ListActivity.value = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const addActivity = async () => {
      await axios
        .post('activity-groups', {
          title: 'New Activity',
          email: 'rofiq@gmail.com',
        })
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            getListActivity();
          }
        });
    };
    const deleteActivity = async () => {
      await axios.delete(`activity-groups/${stateById.id}`).then((response) => {
        // console.log(response);
        if (response.status === 200) {
          getListActivity();
        }
      });
    };

    const getActivityById = async (item) => {
      stateById.id = item.id;
      stateById.title = item.title;
    };

    onMounted(async () => {
      await getListActivity();
    });

    return {
      gotoDetail,
      ListActivity,
      day,
      addActivity,
      deleteActivity,
      getActivityById,
      stateById,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  min-height: 10em;
}
</style>
