<template>
    <div class="sova-layout">
        <el-card class="sova-header">
            <div class="header-content">
                <h1>Управление Sova</h1>
                <el-menu mode="horizontal"
:router="true"
:default-active="activeMenu"
class="sova-menu">
                    <el-menu-item index="/sova/factories">
                        <font-awesome-icon :icon="['fas', 'industry']" />
                        Заводы
                    </el-menu-item>
                </el-menu>
            </div>
        </el-card>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'SovaLayout',
    computed: {
        activeMenu() {
            return this.$route.path
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.sova-layout {
  padding: 1.5rem;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
  }
}

.sova-header {
  margin-bottom: 1.5rem;

  @include mobile {
    margin-bottom: 1rem;
  }
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @include mobile {
    gap: 1rem;
  }

  h1 {
    margin: 0;
    color: var(--text-primary);
    font-size: 2rem;

    @include mobile {
      font-size: 1.75rem;
    }

    @include xs-only {
      font-size: 1.5rem;
    }
  }
}

.sova-menu {
  border-bottom: none;

  @include mobile {
    /* Адаптация для горизонтального меню на мобильных */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* для более плавного скролла на iOS */
    padding-bottom: 5px; /* чтобы скроллбар был виден, если нужен */

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--border-color);
      border-radius: 3px;
    }

    /* Скрыть скроллбар для Firefox и IE/Edge */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  :deep(.el-menu-item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    padding: 0 1rem; /* Уменьшить padding для мобильных */

    @include mobile {
      font-size: 0.85rem;
      padding: 0 0.75rem;
    }

    .font-awesome-icon {
      font-size: 1rem;

      @include mobile {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
