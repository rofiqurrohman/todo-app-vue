import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/axios';
import '@/assets/style/main.scss';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

createApp(App).use(store).use(router).mount('#app');
