<template>
  <div class="system-settings">
    <div class="settings-section">
      <h2>Общие настройки</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label>Название системы</label>
          <input type="text" v-model="settings.systemName" placeholder="Введите название системы" />
        </div>
        <div class="setting-item">
          <label>Язык интерфейса</label>
          <select v-model="settings.language">
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Часовой пояс</label>
          <select v-model="settings.timezone">
            <option value="UTC+3">Москва (UTC+3)</option>
            <option value="UTC+0">UTC</option>
            <option value="UTC-5">Нью-Йорк (UTC-5)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Внешний вид</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label>Тема оформления</label>
          <div class="theme-selector">
            <button
              class="theme-btn"
              :class="{ active: settings.theme === 'light' }"
              @click="settings.theme = 'light'"
            >
              <i class="fas fa-sun"></i>
              Светлая
            </button>
            <button
              class="theme-btn"
              :class="{ active: settings.theme === 'dark' }"
              @click="settings.theme = 'dark'"
            >
              <i class="fas fa-moon"></i>
              Тёмная
            </button>
          </div>
        </div>
        <div class="setting-item">
          <label>Основной цвет</label>
          <div class="color-selector">
            <button
              v-for="color in colors"
              :key="color.value"
              class="color-btn"
              :class="{ active: settings.primaryColor === color.value }"
              :style="{ backgroundColor: color.value }"
              @click="settings.primaryColor = color.value"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Уведомления</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label class="checkbox-label">
            <input type="checkbox" v-model="settings.notifications.email" />
            <span>Email уведомления</span>
          </label>
        </div>
        <div class="setting-item">
          <label class="checkbox-label">
            <input type="checkbox" v-model="settings.notifications.browser" />
            <span>Браузерные уведомления</span>
          </label>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="btn btn-outline" @click="resetSettings">
        <i class="fas fa-undo"></i>
        Сбросить
      </button>
      <button class="btn btn-primary" @click="saveSettings">
        <i class="fas fa-save"></i>
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemSettings',
  data() {
    return {
      settings: {
        systemName: 'Dashboard',
        language: 'ru',
        timezone: 'UTC+3',
        theme: 'light',
        primaryColor: '#3498db',
        notifications: {
          email: true,
          browser: false
        }
      },
      colors: [
        { value: '#3498db', name: 'Blue' },
        { value: '#2ecc71', name: 'Green' },
        { value: '#e74c3c', name: 'Red' },
        { value: '#f1c40f', name: 'Yellow' },
        { value: '#9b59b6', name: 'Purple' }
      ],
      defaultSettings: null
    }
  },
  created() {
    // Сохраняем начальные настройки для возможности сброса
    this.defaultSettings = JSON.parse(JSON.stringify(this.settings))
  },
  methods: {
    saveSettings() {
      // Здесь будет логика сохранения настроек
      console.log('Saving settings:', this.settings)
    },
    resetSettings() {
      this.settings = JSON.parse(JSON.stringify(this.defaultSettings))
    }
  }
}
</script>

<style lang="scss" scoped>
.system-settings {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    color: var(--text-primary);
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  input[type='text'],
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    background-color: var(--input-bg);
    color: var(--text-primary);
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  select {
    cursor: pointer;
  }
}

.theme-selector {
  display: flex;
  gap: 1rem;
}

.theme-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-color);
  }

  &.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
}

.color-selector {
  display: flex;
  gap: 0.5rem;
}

.color-btn {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    border-color: var(--text-primary);
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .theme-selector {
    flex-direction: column;
  }
}
</style>
