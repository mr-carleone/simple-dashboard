<template>
  <div class="settings-layout">
    <div class="settings-header">
      <h1>Настройки</h1>
    </div>

    <div class="settings-content">
      <div class="settings-sidebar">
        <nav class="settings-nav">
          <router-link v-for="item in navItems"
:key="item.path"
:to="item.path"
class="nav-item"
active-class="active">
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
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.settings-layout {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include mobile {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @include xs-only {
    padding: 1rem;
    gap: 1rem;
  }
}

.settings-header {
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;

    @include mobile {
      font-size: 1.75rem;
    }

    @include xs-only {
      font-size: 1.5rem;
    }
  }
}

.settings-content {
  flex: 1;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  min-height: 0;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @include xs-only {
    gap: 1rem;
  }
}

.settings-sidebar {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;

  @include mobile {
    position: sticky;
    top: 0;
    z-index: 10;
  }
}

.settings-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  @include mobile {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem;
    -webkit-overflow-scrolling: touch; /* for smoother scrolling on iOS */

    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar for Chrome, Safari and Opera */
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s;

    @include mobile {
      white-space: nowrap;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

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

      @include mobile {
        width: 18px;
      }
    }
  }
}

.settings-main {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
