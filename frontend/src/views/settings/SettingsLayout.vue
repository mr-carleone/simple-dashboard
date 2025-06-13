<template>
  <div class="settings-layout">
    <div class="settings-header">
      <h1>Настройки</h1>
    </div>

    <div class="settings-content">
      <div class="settings-sidebar">
        <nav class="settings-nav">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" active-class="active">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </router-link>
        </nav>
      </div>

      <div class="settings-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsLayout',
  data() {
    return {
      navItems: [
        {
          title: 'Системные настройки',
          path: '/settings/system',
          icon: 'fas fa-cog'
        },
        {
          title: 'Профиль',
          path: '/settings/profile',
          icon: 'fas fa-user'
        },
        {
          title: 'Безопасность',
          path: '/settings/security',
          icon: 'fas fa-shield-alt'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-layout {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-header {
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.settings-content {
  flex: 1;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  min-height: 0;
}

.settings-sidebar {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background-color: var(--hover-bg);
      color: var(--primary-color);
    }

    &.active {
      background-color: var(--primary-color);
      color: white;
    }

    i {
      width: 20px;
      text-align: center;
    }
  }
}

.settings-main {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
}

@media (max-width: 768px) {
  .settings-content {
    grid-template-columns: 1fr;
  }

  .settings-sidebar {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .settings-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem;

    .nav-item {
      white-space: nowrap;
    }
  }
}
</style>
