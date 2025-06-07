// src/store/index.js
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    appName: import.meta.env.VITE_APP_NAME || "Vue3 App",
    isSidebarCollapsed: false, // Состояние сайдбара
  }),
  actions: {
    updateAppName(newName) {
      this.appName = newName;
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    collapseSidebar() {
      this.isSidebarCollapsed = true;
    },
    expandSidebar() {
      this.isSidebarCollapsed = false;
    },
  },
});
