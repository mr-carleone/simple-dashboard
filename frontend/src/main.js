import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
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
  faExclamationTriangle
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
  faExclamationTriangle
)

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

// Регистрируем компонент FontAwesome
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
