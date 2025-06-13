<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <span v-if="!isCollapsed" class="logo-text">Dashboard</span>
      </div>
    </div>

    <div class="user-info" v-if="store.user">
      <img :src="store.user.avatar_url" alt="User Avatar" class="avatar" />
      <div class="user-details">
        <h3>{{ store.user.username }}</h3>
        <p>{{ store.user.email }}</p>
      </div>
    </div>
    <div v-else-if="store.loading" class="loading">
      Загрузка...
    </div>
    <div v-else class="user-info">
      <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="Default Avatar" class="avatar" />
      <div class="user-details">
        <h3>Гость</h3>
        <p>Пожалуйста, войдите</p>
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

      <router-link to="/sova/factories" class="nav-item" active-class="active">
        <i class="fas fa-industry"></i>
        <span v-if="!isCollapsed">Заводы</span>
      </router-link>

      <router-link to="/settings" class="nav-item" active-class="active">
        <i class="fas fa-cog"></i>
        <span v-if="!isCollapsed">Настройки</span>
      </router-link>

    </nav>

    <div class="sidebar-footer">
      <div class="footer-actions">
        <ThemeToggle />
        <button class="logout-btn" @click="logout" title="Выйти">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button class="collapse-btn" @click="toggleSidebar"
          :title="isCollapsed ? 'Развернуть панель' : 'Свернуть панель'">
          <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/store'
import ThemeToggle from './ThemeToggle.vue'

const store = useMainStore()

onMounted(async () => {
  await store.fetchCurrentUser()
})

const isCollapsed = ref(false)
const isTasksOpen = ref(false)
const isSovaOpen = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleTasksClick = () => {
  if (isCollapsed.value) {
    isCollapsed.value = false
    isTasksOpen.value = true
  } else {
    isTasksOpen.value = !isTasksOpen.value
  }
}

const handleSovaClick = () => {
  if (isCollapsed.value) {
    isCollapsed.value = false
    isSovaOpen.value = true
  } else {
    isSovaOpen.value = !isSovaOpen.value
  }
}

const logout = () => {
  store.logout()
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 1000;
  overflow: hidden;

  &-collapsed {
    width: 70px;
  }

  &-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    flex-shrink: 0;
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
}

.user-info {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-tertiary);

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--border-color);
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-details h3 {
    font-weight: 600;
    color: var(--text-color);
  }

  .user-details p {
    font-size: 0.875rem;
    color: var(--text-secondary);
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
  height: 32px;
  width: 32px;
  flex-shrink: 0;

  &-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
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
      width: 250px;
    }
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
