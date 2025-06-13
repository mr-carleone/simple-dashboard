<template>
  <div class="system-settings">
    <div class="settings-section">
      <h2>Общие настройки</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="systemName">Название системы</label>
          <input
            type="text"
            id="systemName"
            name="systemName"
            v-model="settings.systemName"
            placeholder="Введите название системы"
            autocomplete="organization"
          />
        </div>
        <div class="setting-item">
          <label for="language">Язык интерфейса</label>
          <select id="language" v-model="settings.language">
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="setting-item">
          <label for="timezone">Часовой пояс</label>
          <select id="timezone" v-model="settings.timezone">
            <option value="UTC+3">Москва (UTC+3)</option>
            <option value="UTC+0">Лондон (UTC+0)</option>
            <option value="UTC-5">Нью-Йорк (UTC-5)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Внешний вид</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="theme">Тема оформления</label>
          <select id="theme" v-model="settings.theme">
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="system">Системная</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Основной цвет
            <div class="color-picker">
              <button
                v-for="color in colors"
                :key="color.value"
                class="color-btn"
                :class="{ active: settings.primaryColor === color.value }"
                :style="{ backgroundColor: color.value }"
                @click="settings.primaryColor = color.value"
              ></button>
              <input type="hidden"
id="primaryColorInput"
name="primaryColor"
v-model="settings.primaryColor" />
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Уведомления</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label class="checkbox-label" for="emailNotifications">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              v-model="settings.notifications.email"
            />
            <span>Email уведомления</span>
          </label>
        </div>
        <div class="setting-item">
          <label class="checkbox-label" for="browserNotifications">
            <input
              type="checkbox"
              id="browserNotifications"
              name="browserNotifications"
              v-model="settings.notifications.browser"
            />
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
import { useSettingsStore } from '@/store/settings'

export default {
  name: 'SystemSettings',
  setup() {
    const settingsStore = useSettingsStore()
    return { settingsStore }
  },
  data() {
    return {
      colors: [
        { value: '#3498db', name: 'Blue' },
        { value: '#2ecc71', name: 'Green' },
        { value: '#e74c3c', name: 'Red' },
        { value: '#f1c40f', name: 'Yellow' },
        { value: '#9b59b6', name: 'Purple' }
      ]
    }
  },
  computed: {
    settings: {
      get() {
        return this.settingsStore.settings
      },
      set(value) {
        this.settingsStore.settings = value
      }
    }
  },
  async created() {
    await this.settingsStore.loadSettings()
  },
  methods: {
    async saveSettings() {
      const success = await this.settingsStore.saveSettings(this.settings)
      if (success) {
        this.$message.success('Настройки успешно сохранены')
      } else {
        this.$message.error('Ошибка при сохранении настроек')
      }
    },
    resetSettings() {
      this.settingsStore.resetSettings()
      this.$message.success('Настройки сброшены')
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.system-settings {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include mobile {
    padding: 1rem;
    gap: 1.5rem;
  }

  @include xs-only {
    padding: 0.75rem;
    gap: 1rem;
  }
}

.settings-section {
  h2 {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    color: var(--text-primary);

    @include mobile {
      margin: 0 0 1rem;
      font-size: 1.125rem;
    }

    @include xs-only {
      margin: 0 0 0.75rem;
      font-size: 1rem;
    }
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @include xs-only {
    gap: 0.75rem;
  }
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    color: var(--text-secondary);

    @include mobile {
      font-size: 0.8125rem;
    }

    @include xs-only {
      font-size: 0.75rem;
    }
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

    @include mobile {
      padding: 0.625rem;
      font-size: 0.8125rem;
    }

    @include xs-only {
      padding: 0.5rem;
      font-size: 0.75rem;
    }

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

  @include mobile {
    flex-direction: column;
    gap: 0.75rem;
  }
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
  font-size: 0.875rem;

  @include mobile {
    padding: 0.625rem;
    font-size: 0.8125rem;
  }

  @include xs-only {
    padding: 0.5rem;
    font-size: 0.75rem;
  }

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
  flex-wrap: wrap;

  @include mobile {
    gap: 0.375rem;
  }
}

.color-btn {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  @include mobile {
    width: 28px;
    height: 28px;
  }

  @include xs-only {
    width: 24px;
    height: 24px;
  }

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
  font-size: 0.875rem;

  @include mobile {
    font-size: 0.8125rem;
  }

  @include xs-only {
    font-size: 0.75rem;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;

    @include mobile {
      width: 16px;
      height: 16px;
    }

    @include xs-only {
      width: 14px;
      height: 14px;
    }
  }
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  @include mobile {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    min-width: 120px;

    @include mobile {
      width: 100%;
    }
  }
}
</style>
