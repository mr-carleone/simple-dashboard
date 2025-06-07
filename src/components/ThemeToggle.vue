<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="isDark ? 'Светлая тема' : 'Темная тема'"
  >
    <i :class="['fas', isDark ? 'fa-sun' : 'fa-moon']"></i>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: false
    }
  },
  created() {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme')
    this.isDark = savedTheme === 'dark'
    this.applyTheme()
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    }
  }
}
</script>

<style lang="scss" scoped>
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

  i {
    width: 20px;
    text-align: center;
  }

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .theme-toggle {
    font-size: 1.1rem;
  }
}
</style>
