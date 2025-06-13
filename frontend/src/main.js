import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useMainStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/scss/main.scss'

// Импорт FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faUser,
  faUsers,
  faCog,
  faSignOutAlt,
  faBell,
  faSearch,
  faEllipsisV,
  faPlus,
  faIndustry,
  faBuilding,
  faEye,
  faEdit,
  faTrash,
  faUserPlus,
  faChartLine,
  faTruck,
  faExclamationTriangle,
  faMoon,
  faChevronLeft,
  faChevronRight,
  faCloudUploadAlt,
  faUpload,
  faUndo,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Добавляем иконки в библиотеку
library.add(
  faHome,
  faUser,
  faUsers,
  faCog,
  faSignOutAlt,
  faBell,
  faSearch,
  faEllipsisV,
  faPlus,
  faIndustry,
  faBuilding,
  faEye,
  faEdit,
  faTrash,
  faUserPlus,
  faChartLine,
  faTruck,
  faExclamationTriangle,
  faMoon,
  faChevronLeft,
  faChevronRight,
  faCloudUploadAlt,
  faUpload,
  faUndo,
  faSave
)

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// Инициализация Pinia и получение данных пользователя до монтирования приложения
async function initializeApp() {
  const mainStore = useMainStore(pinia)

  if (localStorage.getItem('token') && !mainStore.currentUser) {
    await mainStore.fetchCurrentUser()
  }

  app.use(router)
  app.use(ElementPlus)

  app.component('font-awesome-icon', FontAwesomeIcon)

  app.mount('#app')
}

initializeApp()
