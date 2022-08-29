<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-between align-items-center">
        <img
          src="@/assets/icon/icon-back.svg"
          class="pointer-cursor"
          alt="back"
          @click="router.back"
          data-cy="todo-back-button"
        />
        <div class="custom-input d-flex align-items-center">
          <input
            type="text"
            class="form-control bg-transparent"
            v-model="titleTodo"
            id="inputTitle"
            @blur="updateTitle"
            data-cy="todo-title"
          />
          <label for="inputTitle" data-cy="todo-title">
            <img src="@/assets/icon/icon-edit.svg" alt="edit" class="pointer-cursor ms-3" />
          </label>
        </div>
      </div>
      <div class="d-flex">
        <div class="dropdown me-3">
          <button
            class="btn btn-custom"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-cy="todo-sort-button"
          >
            <img src="@/assets/icon/icon-sort.svg" alt="" data-cy="sort-selection-icon" />
          </button>
          <ul class="dropdown-menu">
            <li v-for="item in sortOptions" class="custom-list" :key="item.value">
              <button
                type="button"
                class="btn d-flex justify-content-between"
                @click="sorting(item.value)"
                data-cy="sort-selection"
              >
                <div>
                  <img :src="require(`@/assets/icon/${item.img}`)" alt="icon-sort" class="me-2" />
                  <span data-cy="sort-selection-title">{{ item.label }}</span>
                </div>
                <div v-show="types === item.value" class="ms-3">
                  <img src="@/assets/icon/icon-check.svg" alt="" />
                </div>
              </button>
            </li>
          </ul>
        </div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#addModal"
          type="button"
          class="btn btn-primary fw-semibold fs-5 rounded-pill text-white"
          data-cy="todo-add-button"
        >
          <img src="@/assets/icon/icon-plus.svg" alt="add" />
          <span>Tambah</span>
        </button>
      </div>
    </div>
    <div v-show="listItems.length == 0" class="text-center mt-5">
      <img
        src="@/assets/img/todo-empty-state.png"
        alt="add"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        data-cy="todo-empty-state"
      />
    </div>
    <div v-show="listItems.length != 0" class="mt-5">
      <div
        v-for="item in listItems"
        :key="item.id"
        class="card p-4 mb-3 d-flex flex-row justify-content-between"
        data-cy="todo-item"
      >
        <div class="d-flex align-items-center">
          <input
            v-model="checkboxList[item.id]"
            class="form-check-input d-block"
            type="checkbox"
            id="inlineCheckbox1"
            value="1"
            :checked="item.is_active === 0"
            @change="updateActive(item.id)"
            data-cy="todo-item-checkbox"
          />
          <i
            class="label-priority mx-3"
            :style="{ background: selectedColor(item.priority) }"
            data-cy="todo-item-priority-indicator"
          />
          <span
            class="d-block fs-5 fw-semibold"
            :class="checkboxList[item.id] ? 'text-decoration-line-through text-secondary' : ''"
            data-cy="todo-item-title"
          >
            {{ item.title }}
          </span>
          <img
            src="@/assets/icon/icon-edit.svg"
            alt="edit"
            class="pointer-cursor ms-3"
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
            @click="getTodoById(item)"
            data-cy="todo-item-edit-button"
          />
        </div>
        <div
          @click="getTodoById(item)"
          data-cy="todo-item-delete-button"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          <img src="@/assets/icon/icon-delete.svg" class="pointer-cursor" alt="delete" />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal add item -->
  <div
    class="modal fade"
    id="addModal"
    tabindex="-1"
    aria-labelledby="addModalLabel"
    aria-hidden="true"
    data-cy="modal-add-todo"
  >
    <div class="modal-dialog modal-dialog-centered" data-cy="todo-modal-add">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tambah List Item</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-cy="modal-add-close-button"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name" class="col-form-label">Nama List Item</label>
              <input
                v-model="stateTodo.title"
                type="text"
                class="form-control"
                id="name"
                data-cy="modal-add-name-input"
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Priority</label>
              <select
                v-model="stateTodo.priority"
                class="form-select d-inline"
                aria-label="Default select example"
                data-cy="modal-add-priority-dropdown"
              >
                <option
                  v-for="item in priorityOptions"
                  :key="item"
                  :value="item.value"
                  data-cy="modal-add-priority-dropdown"
                >
                  <span>
                    <i class="label-priority d-inline-block" :style="{ background: item.color }" />
                    {{ item.label }}
                  </span>
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="addTodoItem"
            :disabled="stateTodo.title === ''"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary text-white"
            data-cy="modal-add-save-button"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Update item -->
  <div
    class="modal fade"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="updateModalLabel"
    aria-hidden="true"
    data-cy="modal-update-todo"
  >
    <div class="modal-dialog modal-dialog-centered" data-cy="todo-modal-update">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update List Item</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-cy="modal-update-close-button"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name" class="col-form-label">Nama List Item</label>
              <input
                v-model="stateOneTodo.title"
                type="text"
                class="form-control"
                id="name"
                data-cy="modal-update-name-input"
                required
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Priority</label>
              <select
                v-model="stateOneTodo.priority"
                class="form-select d-inline"
                aria-label="Default select example"
                data-cy="modal-update-priority-dropdown"
              >
                <option
                  v-for="item in priorityOptions"
                  :selected="item.value === stateOneTodo.priority"
                  :key="item"
                  :value="item.value"
                >
                  <span>
                    <i class="label-priority d-inline-block" :style="{ background: item.color }" />
                    {{ item.label }}
                  </span>
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            @click="updateTodo"
            :disabled="stateOneTodo.title === ''"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary text-white"
            data-cy="modal-update-save-button"
          >
            Simpan
          </button>
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
    <div class="modal-dialog modal-dialog-centered" data-cy="todo-modal-delete">
      <div class="modal-content py-4">
        <div class="modal-body text-center">
          <img src="@/assets/icon/icon-alert.svg" class="d-block mx-auto" alt="" />
          <span
            >Apakah anda yakin menghapus activity <b>"{{ stateOneTodo.title }}"</b> ?</span
          >
        </div>
        <div class="text-center">
          <button
            type="button"
            class="btn btn-secondary me-2"
            data-bs-dismiss="modal"
            data-cy="modal-delete-cancel-button"
          >
            Cancel
          </button>
          <button
            @click="deleteTodoItem"
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
  <span class="visually-hidden" data-cy="modal-information">Data dihapus</span>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const idParams = route.params.idActivity;
    const listItems = ref([]);
    const titleTodo = ref(null);
    const checkboxList = ref([]);
    const types = ref('newest');
    const sortOptions = ref([
      {
        label: 'Terbaru',
        value: 'newest',
        img: 'icon-sort-newest.svg',
      },
      {
        label: 'Terlama',
        value: 'oldest',
        img: 'icon-sort-oldest.svg',
      },
      {
        label: 'A-Z',
        value: 'asc',
        img: 'icon-sort-a-alpha.svg',
      },
      {
        label: 'Z-A',
        value: 'desc',
        img: 'icon-sort-d-alpha.svg',
      },
      {
        label: 'Belum Selesai',
        value: 'no',
        img: 'icon-sort-active.svg',
      },
    ]);
    const priorityOptions = ref([
      {
        label: 'Very High',
        value: 'very-high',
        color: '#ed4c5c',
      },
      {
        label: 'High',
        value: 'high',
        color: '#f8a540',
      },
      {
        label: 'Medium',
        value: 'normal',
        color: '#1ba791',
      },
      {
        label: 'Low',
        value: 'low',
        color: '#428bc1',
      },
      {
        label: 'Very Low',
        value: 'very-low',
        color: '#8943c1',
      },
    ]);

    const sorting = (type) => {
      types.value = type;
      if (type === 'newest') {
        listItems.value = listItems.value.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0));
      } else if (type === 'oldest') {
        listItems.value = listItems.value.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
      } else if (type === 'asc') {
        listItems.value = listItems.value.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
      } else if (type === 'desc') {
        listItems.value = listItems.value.sort((a, b) =>
          a.title < b.title ? 1 : b.title < a.title ? -1 : 0
        );
      }
    };

    const stateTodo = reactive({
      activity_group_id: idParams,
      priority: 'very-high',
      title: '',
    });

    const stateOneTodo = reactive({
      id: null,
      priority: '',
      title: '',
    });

    const selectedColor = (type) => {
      let find = priorityOptions.value.find((e) => e.value === type);
      return find.color;
    };

    const getListDetail = async () => {
      await axios.get(`activity-groups/${idParams}`).then((response) => {
        listItems.value = response.data.todo_items;
        titleTodo.value = response.data.title;
      });
    };

    const updateTitle = async () => {
      await axios.patch(`activity-groups/${idParams}`, {
        title: titleTodo.value,
      });
    };

    const updateActive = async (id) => {
      // console.log(id);
      console.log(checkboxList.value[id]);
      // await axios
      //   .patch(`todo-items/${id}`, { is_active: checkboxList.value[id] })
      //   .then((response) => console.log(response));
    };

    const addTodoItem = async () => {
      console.log(stateTodo);
      await axios.post('todo-items/', stateTodo).then((response) => {
        if (response.status === 201) {
          getListDetail();
        }
      });
    };

    const getTodoById = async (item) => {
      stateOneTodo.id = item.id;
      stateOneTodo.priority = item.priority;
      stateOneTodo.title = item.title;
    };

    const updateTodo = async () => {
      await axios.patch(`todo-items/${stateOneTodo.id}`, stateOneTodo).then((response) => {
        if (response.status === 200) {
          getListDetail();
        }
      });
    };

    const deleteTodoItem = async () => {
      await axios.delete(`todo-items/${stateOneTodo.id}`).then((response) => {
        if (response.status === 200) {
          getListDetail();
        }
      });
    };

    onMounted(async () => {
      await getListDetail();
    });

    return {
      router,
      titleTodo,
      updateTitle,
      sortOptions,
      priorityOptions,
      checkboxList,
      addTodoItem,
      deleteTodoItem,
      listItems,
      selectedColor,
      stateTodo,
      updateActive,
      sorting,
      types,
      getTodoById,
      stateOneTodo,
      updateTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  position: relative;
  input {
    border: 0;
    border-radius: 0;
    font-size: 30px;
    font-weight: 700;
    padding: 0;

    &:focus {
      & ~ label {
        display: none;
      }
      box-shadow: none;
      outline: none;
      border-bottom: 1px solid rgb(101, 101, 101);
    }
  }

  // label {
  //   position: absolute;
  //   right: 80px;
  // }
}

.btn-custom {
  width: 54px;
  height: 54px;
  border-radius: 100%;
  border: 1px solid rgba(178, 178, 178, 0.541);
}

.custom-list {
  white-space: nowrap;
  padding: 0 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(184, 183, 183, 0.67);
  }

  button {
    width: 100%;
    border: 0;
    text-align: start;
    font-size: 16px;
  }
}
</style>
