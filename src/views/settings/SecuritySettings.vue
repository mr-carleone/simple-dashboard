<template>
  <div class="security-settings">
    <div class="settings-section">
      <h2>Изменение пароля</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="currentPassword">Текущий пароль</label>
          <div class="password-input">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              id="currentPassword"
              v-model="passwords.current"
              placeholder="Введите текущий пароль"
            />
            <button class="toggle-password" @click="showCurrentPassword = !showCurrentPassword">
              <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="setting-item">
          <label for="newPassword">Новый пароль</label>
          <div class="password-input">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              id="newPassword"
              v-model="passwords.new"
              placeholder="Введите новый пароль"
            />
            <button class="toggle-password" @click="showNewPassword = !showNewPassword">
              <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="setting-item">
          <label for="confirmPassword">Подтверждение пароля</label>
          <div class="password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="passwords.confirm"
              placeholder="Подтвердите новый пароль"
            />
            <button class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Двухфакторная аутентификация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label class="checkbox-label">
            <input type="checkbox" v-model="security.twoFactor" />
            <span>Включить двухфакторную аутентификацию</span>
          </label>
          <p class="setting-description">
            Добавьте дополнительный уровень безопасности к вашей учетной записи
          </p>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Сессии</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <div class="sessions-list">
            <div v-for="session in sessions" :key="session.id" class="session-item">
              <div class="session-info">
                <i :class="session.icon"></i>
                <div class="session-details">
                  <span class="session-device">{{ session.device }}</span>
                  <span class="session-location">{{ session.location }}</span>
                  <span class="session-time">{{ session.lastActive }}</span>
                </div>
              </div>
              <button
                v-if="!session.current"
                class="btn btn-outline text-danger"
                @click="terminateSession(session)"
              >
                <i class="fas fa-times"></i>
                Завершить
              </button>
              <span v-else class="current-session">Текущая сессия</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="btn btn-outline" @click="resetSecurity">
        <i class="fas fa-undo"></i>
        Сбросить
      </button>
      <button class="btn btn-primary" @click="saveSecurity">
        <i class="fas fa-save"></i>
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecuritySettings',
  data() {
    return {
      passwords: {
        current: '',
        new: '',
        confirm: ''
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      security: {
        twoFactor: false
      },
      sessions: [
        {
          id: 1,
          device: 'Chrome на Windows',
          location: 'Москва, Россия',
          lastActive: 'Сейчас',
          icon: 'fab fa-chrome',
          current: true
        },
        {
          id: 2,
          device: 'Safari на iPhone',
          location: 'Санкт-Петербург, Россия',
          lastActive: '2 часа назад',
          icon: 'fab fa-safari',
          current: false
        },
        {
          id: 3,
          device: 'Firefox на MacOS',
          location: 'Нью-Йорк, США',
          lastActive: '1 день назад',
          icon: 'fab fa-firefox',
          current: false
        }
      ],
      defaultSecurity: null
    }
  },
  created() {
    // Сохраняем начальные настройки безопасности для возможности сброса
    this.defaultSecurity = JSON.parse(JSON.stringify(this.security))
  },
  methods: {
    saveSecurity() {
      // Здесь будет логика сохранения настроек безопасности
      console.log('Saving security settings:', {
        passwords: this.passwords,
        security: this.security
      })
    },
    resetSecurity() {
      this.security = JSON.parse(JSON.stringify(this.defaultSecurity))
      this.passwords = {
        current: '',
        new: '',
        confirm: ''
      }
    },
    terminateSession(session) {
      // Здесь будет логика завершения сессии
      console.log('Terminating session:', session)
    }
  }
}
</script>

<style lang="scss" scoped>
.security-settings {
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
}

.password-input {
  position: relative;

  input {
    width: 100%;
    padding: 0.75rem;
    padding-right: 2.5rem;
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

  .toggle-password {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;

    &:hover {
      color: var(--primary-color);
    }
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

.setting-description {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
}

.session-info {
  display: flex;
  align-items: center;
  gap: 1rem;

  i {
    font-size: 1.5rem;
    color: var(--text-secondary);
  }
}

.session-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.session-device {
  font-weight: 500;
  color: var(--text-primary);
}

.session-location,
.session-time {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.current-session {
  font-size: 0.875rem;
  color: var(--success-color);
  font-weight: 500;
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

  .session-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
