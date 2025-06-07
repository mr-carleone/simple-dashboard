<template>
  <div class="settings-layout">
    <div class="settings-header">
      <h2>Настройки</h2>
      <nav class="settings-tabs">
        <router-link
          :to="{ name: 'SystemSettings' }"
          class="settings-tab"
          :class="{ active: $route.name === 'SystemSettings' }"
        >
          Системные
        </router-link>
        <router-link
          :to="{ name: 'ProfileSettings' }"
          class="settings-tab"
          :class="{ active: $route.name === 'ProfileSettings' }"
        >
          Профиль
        </router-link>
      </nav>
    </div>

    <!-- Контейнер для дочерних компонентов настроек -->
    <div class="settings-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
.settings-layout {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.settings-header {
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.settings-tabs {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.settings-tab {
  padding: 8px 15px;
  text-decoration: none;
  color: #555;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f7fa;
  }

  &.active {
    background: #3498db;
    color: white;
    font-weight: 500;
  }
}

.settings-content {
  padding: 10px;
}
</style>
