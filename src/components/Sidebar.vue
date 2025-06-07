<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
        <span v-if="!isCollapsed" class="logo-text">Dashboard</span>
      </div>
    </div>

    <div class="user-info" v-if="!isCollapsed">
      <img :src="user.avatar" :alt="user.name" class="user-avatar" />
      <div class="user-details">
        <span class="user-name">{{ user.name }}</span>
        <span class="user-role">{{ user.role }}</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <i class="fas fa-home"></i>
        <span v-if="!isCollapsed">Главная</span>
      </router-link>

      <router-link to="/users" class="nav-item" active-class="active">
        <i class="fas fa-users"></i>
        <span v-if="!isCollapsed">Пользователи</span>
      </router-link>

      <router-link to="/groups" class="nav-item" active-class="active">
        <i class="fas fa-user-friends"></i>
        <span v-if="!isCollapsed">Группы</span>
      </router-link>

      <div class="nav-group" :class="{ 'is-open': isTasksOpen }">
        <div class="nav-item" @click="handleTasksClick">
          <i class="fas fa-tasks"></i>
          <span v-if="!isCollapsed">Задачи</span>
          <i v-if="!isCollapsed" class="fas fa-chevron-down" :class="{ 'is-open': isTasksOpen }"></i>
        </div>
        <div class="nav-subitems" v-if="!isCollapsed && isTasksOpen">
          <router-link to="/tasks/my" class="nav-subitem" active-class="active">
            <i class="fas fa-user-check"></i>
            <span>Мои задачи</span>
          </router-link>
          <router-link to="/tasks/team" class="nav-subitem" active-class="active">
            <i class="fas fa-users-cog"></i>
            <span>Задачи команды</span>
          </router-link>
          <router-link to="/tasks/project" class="nav-subitem" active-class="active">
            <i class="fas fa-project-diagram"></i>
            <span>Проектные задачи</span>
          </router-link>
          <router-link to="/tasks/calendar" class="nav-subitem" active-class="active">
            <i class="fas fa-calendar-alt"></i>
            <span>Календарь задач</span>
          </router-link>
        </div>
      </div>

      <router-link to="/profile" class="nav-item" active-class="active">
        <i class="fas fa-user"></i>
        <span v-if="!isCollapsed">Профиль</span>
      </router-link>

      <router-link to="/settings" class="nav-item" active-class="active">
        <i class="fas fa-cog"></i>
        <span v-if="!isCollapsed">Настройки</span>
      </router-link>

      <router-link to="/about" class="nav-item" active-class="active">
        <i class="fas fa-info-circle"></i>
        <span v-if="!isCollapsed">О нас</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="footer-actions">
        <ThemeToggle />
        <button class="logout-btn" @click="logout" title="Выйти">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button
          class="collapse-btn"
          @click="toggleSidebar"
          :title="isCollapsed ? 'Развернуть панель' : 'Свернуть панель'"
        >
          <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue'

export default {
  name: 'Sidebar',
  components: {
    ThemeToggle
  },
  data() {
    return {
      isCollapsed: false,
      isTasksOpen: false,
      user: {
        name: 'Иван Иванов',
        role: 'Администратор',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    }
  },
  watch: {
    $route: {
      handler(to) {
        // Если маршрут начинается с /tasks и сайдбар свернут, разворачиваем его
        if (to.path.startsWith('/tasks') && this.isCollapsed) {
          this.isCollapsed = false
          this.isTasksOpen = true
        }
      },
      immediate: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    handleTasksClick() {
      if (this.isCollapsed) {
        this.isCollapsed = false
        this.isTasksOpen = true
      } else {
        this.isTasksOpen = !this.isTasksOpen
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
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

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-name {
    font-weight: 600;
    color: var(--text-color);
  }

  .user-role {
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
