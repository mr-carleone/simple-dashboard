import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/UsersView.vue"),
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("@/views/GroupsView.vue"),
  },
  {
    path: "/profile",
    name: "Profiles",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/about",
    name: "Abouts",
    component: () => import("@/views/AboutView.vue"),
  },
  // Вложенные настройки
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings/SettingsLayout.vue"),
    redirect: "/settings/system",
    children: [
      {
        path: "system",
        name: "SystemSettings",
        component: () => import("@/views/settings/SystemSettings.vue"),
      },
      {
        path: "profile",
        name: "ProfileSettings",
        component: () => import("@/views/settings/ProfileSettings.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
