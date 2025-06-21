<template>
  <div class="app">
    <button v-if="showSidebar && isMobile" class="mobile-sidebar-toggle" @click="toggleMobileSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <Sidebar
      v-if="showSidebar"
      :isMobileSidebarOpen="isMobileSidebarOpen"
      :isMobile="isMobile"
      @close-mobile-sidebar="closeMobileSidebar"
    />
    <main class="main-content" :class="{
      'full-width': !showSidebar,
      'mobile-sidebar-open': isMobileSidebarOpen && isMobile
    }">
      <router-view />
    </main>
    <div v-if="isMobileSidebarOpen && isMobile" class="overlay" @click="closeMobileSidebar"></div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useSettingsStore } from '@/store/settings'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  setup() {
    const settingsStore = useSettingsStore()
    const isMobileSidebarOpen = ref(false)
    const isMobile = ref(window.innerWidth < 768)
    const router = useRouter()

    const handleResize = () => {
      const oldIsMobile = isMobile.value
      isMobile.value = window.innerWidth < 768
      console.log('App.vue handleResize: isMobile changed from', oldIsMobile, 'to', isMobile.value)
      if (!isMobile.value) {
        isMobileSidebarOpen.value = false
      }
    }

    onMounted(async () => {
      window.addEventListener('resize', handleResize)
      await settingsStore.loadSettings()
      if (settingsStore.settings.theme) {
        settingsStore.applySettings()
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const toggleMobileSidebar = () => {
      isMobileSidebarOpen.value = !isMobileSidebarOpen.value
    }

    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false
    }

    const showSidebar = computed(() => {
      const currentRoute = router.currentRoute.value
      // Скрываем сайдбар для страниц логина и 404
      const shouldShow = currentRoute.name !== 'Login' && currentRoute.name !== 'NotFound'
      return shouldShow
    })

    return {
      showSidebar,
      isMobileSidebarOpen,
      isMobile,
      toggleMobileSidebar,
      closeMobileSidebar
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.app {
  min-height: 100vh;
  display: flex;
}

.mobile-sidebar-toggle {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @include sm-up {
    display: none;
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--background-light);
  transition: margin-left 0.3s ease;
  box-sizing: border-box;

  @include sm-up {
    margin-left: var(--sidebar-width);
  }

  @include mobile {
    padding-top: 6rem;
    padding-left: 6rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
  }

  &.mobile-sidebar-open {
    filter: brightness(0.5);
    pointer-events: none;
  }
}

.main-content.full-width {
  margin-left: 0;
  padding: 0;
}

.sidebar-collapsed + .main-content {
  margin-left: var(--sidebar-collapsed-width);

  @include mobile {
    margin-left: 0;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  @include sm-up {
    display: none;
  }
}
</style>
