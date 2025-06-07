<template>
  <div class="app-container">
    <AppSidebar />

    <main class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/layout/AppSidebar.vue";
</script>

<style lang="scss">
.app-container {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

// Анимация перехода между страницами
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
