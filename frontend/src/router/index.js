import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import UsersLayout from '../views/users/UsersLayout.vue'
import UsersList from '../views/users/UsersList.vue'
import UserDetails from '../views/users/UserDetails.vue'
import UserEdit from '../views/users/UserEdit.vue'
import SettingsLayout from '../views/settings/SettingsLayout.vue'
import SystemSettings from '../views/settings/SystemSettings.vue'
import ProfileSettings from '../views/settings/ProfileSettings.vue'
import SecuritySettings from '../views/settings/SecuritySettings.vue'
import SovaLayout from '../views/sova/SovaLayout.vue'
import FactoriesList from '../views/sova/FactoriesList.vue'
import FactoryDetails from '../views/sova/FactoryDetails.vue'
import ProfileView from '../views/ProfileView.vue'
import { useMainStore } from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Вход в систему',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Главная',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      title: 'Профиль',
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersLayout,
    meta: {
      title: 'Пользователи',
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'UsersList',
        component: UsersList,
        meta: {
          title: 'Список пользователей',
          requiresAuth: true
        }
      },
      {
        path: ':id',
        name: 'UserDetails',
        component: UserDetails,
        meta: {
          title: 'Детали пользователя',
          requiresAuth: true
        }
      },
      {
        path: ':id/edit',
        name: 'UserEdit',
        component: UserEdit,
        meta: {
          title: 'Редактирование пользователя',
          requiresAuth: true
        }
      }
    ]
  },
  // Вложенные настройки
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsLayout,
    redirect: '/settings/system',
    meta: {
      title: 'Настройки',
      requiresAuth: true
    },
    children: [
      {
        path: 'system',
        name: 'SystemSettings',
        component: SystemSettings,
        meta: {
          title: 'Системные настройки',
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'ProfileSettings',
        component: ProfileSettings,
        meta: {
          title: 'Настройки профиля',
          requiresAuth: true
        }
      },
      {
        path: 'security',
        name: 'SecuritySettings',
        component: SecuritySettings,
        meta: {
          title: 'Настройки безопасности',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/sova',
    name: 'Sova',
    component: SovaLayout,
    meta: {
      title: 'Управление заводами',
      requiresAuth: true
    },
    children: [
      {
        path: 'factories',
        name: 'FactoriesList',
        component: FactoriesList,
        meta: {
          title: 'Список заводов',
          requiresAuth: true
        }
      },
      {
        path: 'factories/:id',
        name: 'FactoryDetails',
        component: FactoryDetails,
        meta: {
          title: 'Детали завода',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: 'Страница не найдена',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Dashboard` : 'Dashboard'

  const mainStore = useMainStore()

  // Ensure user data is loaded if a token exists and user is not yet loaded
  if (localStorage.getItem('token') && !mainStore.user) {
    await mainStore.fetchCurrentUser()
  }

  const isAuthenticated = !!mainStore.user

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires authentication
    if (!isAuthenticated) {
      // If not authenticated, redirect to login page
      next('/login')
    } else {
      // If authenticated, allow access
      next()
    }
  } else if (to.name === 'Login' && isAuthenticated) {
    // If trying to go to login page while already authenticated, redirect to home
    next('/')
  } else {
    // For routes that don't require auth, or if conditions above don't apply, proceed
    next()
  }
})

export default router
