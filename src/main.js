import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Импорт FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUsers,
  faCog,
  faList,
  faFolder,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Добавляем иконки в библиотеку
library.add(
  faHome,
  faUsers,
  faCog,
  faList,
  faFolder,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faBars,
  faTimes,
  faInfoCircle,
  faUser
);

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);

// Регистрируем компонент FontAwesome
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
