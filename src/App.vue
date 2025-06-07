<template>
  <div class="app">
    <Sidebar v-if="showSidebar" />
    <main class="main-content" :class="{ 'full-width': !showSidebar }">
      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  computed: {
    showSidebar() {
      return this.$route.name !== 'Login'
    }
  }
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--background-light);
  transition: margin-left 0.3s ease;
}

.main-content.full-width {
  margin-left: 0;
  padding: 0;
}

/* Когда сайдбар свернут */
.sidebar-collapsed + .main-content {
  margin-left: 70px;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .main-content {
    margin-left: 70px;
    padding: 1rem;
  }

  .main-content.full-width {
    margin-left: 0;
  }

  .sidebar:not(.sidebar-collapsed) + .main-content {
    margin-left: 250px;
  }
}
</style>
