<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Светлая тема' : 'Темная тема'">
    <i :class="['fas', isDark ? 'fa-sun' : 'fa-moon']"></i>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: null
    }
  },
  created() {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme')
    this.isDark = savedTheme === 'dark'
    if (this.isDark !== null) {
      this.applyTheme()
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    applyTheme() {
      if (this.isDark !== null) {
        document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.25rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all var(--transition-normal);
  width: 32px;
  height: 32px;

  @include mobile {
    font-size: 1.125rem;
    width: 30px;
    height: 30px;
  }

  @include xs-only {
    font-size: 1rem;
    width: 28px;
    height: 28px;
  }

  i {
    width: 20px;
    text-align: center;

    @include mobile {
      width: 18px;
    }

    @include xs-only {
      width: 16px;
    }
  }

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--primary-color);
  }
}
</style>
