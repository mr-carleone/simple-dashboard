<template>
  <aside class="sidebar" :class="{
    'sidebar-collapsed': isCollapsed,
    'mobile-open': isMobileSidebarOpen && isMobile,
    'mobile': isMobile
  }">
    <div class="sidebar-header">
      <div class="logo-container">
        <img :src="isCollapsed ? logoIcon : logoFull" alt="Logo" class="logo" />
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <i class="fas fa-home"></i>
        <span v-if="!isCollapsed">Главная</span>
      </router-link>

      <router-link to="/profile" class="nav-item" active-class="active">
        <i class="fas fa-user"></i>
        <span v-if="!isCollapsed">Профиль</span>
      </router-link>

      <router-link to="/users" class="nav-item" active-class="active">
        <i class="fas fa-users"></i>
        <span v-if="!isCollapsed">Пользователи</span>
      </router-link>

      <router-link
        v-if="canAccessFactories"
        to="/sova/factories"
        class="nav-item"
        active-class="active"
      >
        <i class="fas fa-industry"></i>
        <span v-if="!isCollapsed">Заводы</span>
      </router-link>

      <router-link to="/settings" class="nav-item" active-class="active">
        <i class="fas fa-cog"></i>
        <span v-if="!isCollapsed">Настройки</span>
      </router-link>

    </nav>

    <div class="sidebar-footer">
      <div class="user-info" v-if="store.currentUser && !isCollapsed">
        <img
          :src="store.currentUser.avatar_url || defaultAvatar"
          alt="User Avatar"
          class="avatar"
          @error="handleAvatarError"
        />
        <div class="user-details">
          <span class="username">{{ store.currentUser.username }}</span>
        </div>
      </div>
      <div v-else-if="store.loading && !isCollapsed" class="loading">
        Загрузка...
      </div>

      <div class="footer-actions">
        <ThemeToggle />
        <button class="logout-btn" @click="logout" title="Выйти">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button class="collapse-btn"
          @click="toggleSidebar"
          :title="isCollapsed ? 'Развернуть панель' : 'Свернуть панель'">
          <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useMainStore } from '@/store'
import ThemeToggle from './ThemeToggle.vue'
import { useRouter } from 'vue-router'
import logoFull from '@/assets/logo.svg'
import logoIcon from '@/assets/logo-icon.svg'

const store = useMainStore()
const router = useRouter()

const props = defineProps({
  isMobileSidebarOpen: Boolean,
  isMobile: Boolean
})

const emits = defineEmits(['close-mobile-sidebar'])

const isCollapsed = ref(false)
// const isTasksOpen = ref(false)
// const isSovaOpen = ref(false)

// Аватар по умолчанию из UI Avatars
const defaultAvatar = 'https://ui-avatars.com/api/?background=random&name=User'

// Обработчик ошибки загрузки аватара
const handleAvatarError = (event) => {
  event.target.src = defaultAvatar
}

// Проверка доступа к заводам
const canAccessFactories = computed(() => {
  if (!store.currentUser) return false

  const userRole = store.currentUser.role
  return userRole === 'admin' || userRole === 'architect'
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const logout = () => {
  store.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, width 0.3s ease;
  z-index: 1000;
  overflow: hidden;

  &.mobile {
    transform: translateX(-100%);

    &.mobile-open {
      transform: translateX(0);
    }
  }

  &.sidebar-collapsed {
    width: var(--sidebar-collapsed-width);
  }

  @include sm-up {
    transform: none !important;
  }

  &-header {
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border-color);
    flex-shrink: 0;
    transition: padding 0.3s ease;

    .sidebar-collapsed & {
      padding: 1.25rem 0.5rem;
    }
  }

  &-nav {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &-footer {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
    background-color: var(--bg-secondary);
    flex-shrink: 0;
  }
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0;
  margin-top: 0.75rem;
}

.user-info {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: padding 0.3s ease;
  margin-bottom: 0.5rem;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border-color);
    flex-shrink: 0;
    margin-right: 0.75rem;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .username {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--danger-color);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all var(--transition-normal);
  width: 32px;
  height: 32px;
  padding: 0.5rem;

  i {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: var(--danger-color);
    color: white;
  }
}

.logo {
  height: 48px;
  width: auto;
  flex-shrink: 0;

  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
}

.logo-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  transition: opacity 0.3s ease;

  .sidebar-collapsed & {
    display: none;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--primary-color);
  }

  &.active {
    background-color: var(--primary-color);
    color: white;
  }

  i {
    width: 20px;
    margin-right: 1rem;
    flex-shrink: 0;
  }
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  transition: all var(--transition-normal);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius);
  margin-top: 0.5rem;

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--primary-color);
  }
}

.nav-group {
  .nav-item {
    justify-content: space-between;

    .fa-chevron-down {
      transition: transform var(--transition-normal);

      &.is-open {
        transform: rotate(180deg);
      }
    }
  }

  &.is-open {
    background: var(--bg-tertiary);
  }
}

.nav-subitems {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  background: var(--bg-tertiary);
}

.nav-subitem {
  padding: 0.5rem 1rem 0.5rem 3rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all var(--transition-normal);
  cursor: pointer;

  i {
    width: 20px;
    text-align: center;
  }

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--primary-color);
  }

  &.active {
    color: var(--primary-color);
    background-color: var(--bg-secondary);
  }

}

.loading {
  padding: 10px;
  text-align: center;
  color: #888;
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;

    &:not(.sidebar-collapsed) {
      width: 280px;
    }
  }

  .logo {
    height: 40px;
    width: auto;
  }

  .nav-item {
    span {
      display: none;
    }
  }

  .sidebar:not(.sidebar-collapsed) {
    .nav-item span {
      display: inline;
    }
  }
}
</style>
