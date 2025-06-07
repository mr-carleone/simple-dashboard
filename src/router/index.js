import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import UsersLayout from '../views/users/UsersLayout.vue'
import UsersList from '../views/users/UsersList.vue'
import UserDetails from '../views/users/UserDetails.vue'
import UserEdit from '../views/users/UserEdit.vue'
import SettingsLayout from '../views/settings/SettingsLayout.vue'
import SystemSettings from '../views/settings/SystemSettings.vue'
import ProfileSettings from '../views/settings/ProfileSettings.vue'
import SecuritySettings from '../views/settings/SecuritySettings.vue'
import TasksLayout from '../views/tasks/TasksLayout.vue'
import MyTasks from '../views/tasks/MyTasks.vue'
import TeamTasks from '../views/tasks/TeamTasks.vue'
import ProjectTasks from '../views/tasks/ProjectTasks.vue'
import TasksCalendar from '../views/tasks/TasksCalendar.vue'

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: "Вход в систему",
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Главная",
      requiresAuth: true
    }
  },
  {
    path: "/users",
    name: "Users",
    component: UsersLayout,
    meta: {
      title: "Пользователи",
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "UsersList",
        component: UsersList,
        meta: {
          title: "Список пользователей",
          requiresAuth: true
        }
      },
      {
        path: ":id",
        name: "UserDetails",
        component: UserDetails,
        meta: {
          title: "Детали пользователя",
          requiresAuth: true
        }
      },
      {
        path: ":id/edit",
        name: "UserEdit",
        component: UserEdit,
        meta: {
          title: "Редактирование пользователя",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("@/views/groups/GroupsLayout.vue"),
    meta: {
      title: "Группы",
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "GroupsList",
        component: () => import("@/views/groups/GroupsList.vue"),
        meta: {
          title: "Список групп",
          requiresAuth: true
        }
      },
      {
        path: ":id",
        name: "GroupDetails",
        component: () => import("@/views/groups/GroupDetails.vue"),
        meta: {
          title: "Детали группы",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: TasksLayout,
    meta: {
      title: "Задачи",
      requiresAuth: true
    },
    children: [
      {
        path: "my",
        name: "MyTasks",
        component: MyTasks,
        meta: {
          title: "Мои задачи",
          requiresAuth: true
        }
      },
      {
        path: "team",
        name: "TeamTasks",
        component: TeamTasks,
        meta: {
          title: "Задачи команды",
          requiresAuth: true
        }
      },
      {
        path: "project",
        name: "ProjectTasks",
        component: ProjectTasks,
        meta: {
          title: "Проектные задачи",
          requiresAuth: true
        }
      },
      {
        path: "calendar",
        name: "TasksCalendar",
        component: TasksCalendar,
        meta: {
          title: "Календарь задач",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: {
      title: "Профиль",
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      title: "О нас",
      requiresAuth: true
    }
  },
  // Вложенные настройки
  {
    path: "/settings",
    name: "Settings",
    component: SettingsLayout,
    redirect: "/settings/system",
    meta: {
      title: "Настройки",
      requiresAuth: true
    },
    children: [
      {
        path: "system",
        name: "SystemSettings",
        component: SystemSettings,
        meta: {
          title: "Системные настройки",
          requiresAuth: true
        }
      },
      {
        path: "profile",
        name: "ProfileSettings",
        component: ProfileSettings,
        meta: {
          title: "Настройки профиля",
          requiresAuth: true
        }
      },
      {
        path: "security",
        name: "SecuritySettings",
        component: SecuritySettings,
        meta: {
          title: "Настройки безопасности",
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: {
      title: "404 - Страница не найдена",
      requiresAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Глобальный guard для проверки аутентификации
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  // Установка заголовка страницы
  document.title = to.meta.title ? `${to.meta.title} | Dashboard` : 'Dashboard';

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если маршрут требует аутентификации, но пользователь не аутентифицирован
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    // Если пользователь уже аутентифицирован и пытается зайти на страницу входа
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
