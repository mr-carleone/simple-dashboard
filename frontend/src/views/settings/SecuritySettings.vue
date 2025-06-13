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
              name="currentPassword"
              v-model="passwords.current"
              placeholder="Введите текущий пароль"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showCurrentPassword = !showCurrentPassword"
              aria-label="Показать/скрыть пароль"
            >
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
              name="newPassword"
              v-model="passwords.new"
              @input="validateNewPassword"
              placeholder="Введите новый пароль"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showNewPassword = !showNewPassword"
              aria-label="Показать/скрыть пароль"
            >
              <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <ul v-if="passwords.new.length > 0 || passwordErrors.length > 0"
class="password-hints"
role="list"
aria-label="Требования к паролю">
            <li :class="{ 'valid': isNewPasswordLongEnough, 'invalid': !isNewPasswordLongEnough }">Не менее 8 символов</li>
            <li :class="{ 'valid': isNewPasswordEnglishOnly, 'invalid': !isNewPasswordEnglishOnly }">Только английские буквы</li>
            <li :class="{ 'valid': hasNewPasswordUppercase, 'invalid': !hasNewPasswordUppercase }">Хотя бы одна заглавная буква</li>
            <li :class="{ 'valid': hasNewPasswordEnoughSpecialChars, 'invalid': !hasNewPasswordEnoughSpecialChars }">Хотя бы два спецсимвола (!@#$%^&*)</li>
          </ul>
        </div>

        <div class="setting-item">
          <label for="confirmPassword">Подтверждение пароля</label>
          <div class="password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              name="confirmPassword"
              v-model="passwords.confirm"
              placeholder="Подтвердите новый пароль"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
              aria-label="Показать/скрыть пароль"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <p v-if="passwords.confirm.length > 0 && passwords.new !== passwords.confirm" class="text-danger" role="alert">Пароли не совпадают</p>
        </div>
      </div>
      <div class="settings-actions mt-4">
        <button class="btn btn-primary" @click="changePassword">
          <i class="fas fa-key"></i>
          Сменить пароль
        </button>
      </div>
    </div>

    <div class="settings-section">
      <h2>Двухфакторная аутентификация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label class="checkbox-label" for="twoFactor">
            <input
              type="checkbox"
              id="twoFactor"
              name="twoFactor"
              v-model="security.twoFactor"
            />
            <span>Включить двухфакторную аутентификацию</span>
          </label>
          <p class="setting-description">Добавьте дополнительный уровень безопасности к вашей учетной записи</p>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Текущая сессия</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <div class="sessions-list">
            <div v-for="session in sessions" :key="session.id" class="session-item">
              <div class="session-info">
                <i :class="session.icon"></i>
                <div class="session-details">
                  <span class="session-device">{{ session.device }}</span>
                  <span class="session-time">{{ session.lastActive }}</span>
                </div>
              </div>
              <span class="current-session">Активная сессия</span>
            </div>
          </div>
          <p class="session-description">
            Это ваша текущая активная сессия. Для безопасности рекомендуется выходить из системы, если вы используете общий компьютер.
          </p>
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
import { useProfileStore } from '@/store/profile'

export default {
  name: 'SecuritySettings',
  setup() {
    const profileStore = useProfileStore()
    return { profileStore }
  },
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
          device: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                 navigator.userAgent.includes('Firefox') ? 'Firefox' :
                 navigator.userAgent.includes('Safari') ? 'Safari' : 'Браузер',
          location: 'Текущее местоположение',
          lastActive: 'Сейчас',
          icon: navigator.userAgent.includes('Chrome') ? 'fab fa-chrome' :
                navigator.userAgent.includes('Firefox') ? 'fab fa-firefox' :
                navigator.userAgent.includes('Safari') ? 'fab fa-safari' : 'fas fa-globe',
          current: true
        }
      ],
      defaultSecurity: null,
      passwordErrors: []
    }
  },
  computed: {
    isNewPasswordLongEnough() {
      return this.passwords.new.length >= 8
    },
    isNewPasswordEnglishOnly() {
      // Sadece İngilizce harfler, rakamlar ve izin verilen özel karakterler
      return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?~`]*$/.test(this.passwords.new)
    },
    hasNewPasswordUppercase() {
      return /[A-Z]/.test(this.passwords.new)
    },
    hasNewPasswordEnoughSpecialChars() {
      const specialCharCount = (this.passwords.new.match(/[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?~`]/g) || []).length
      return specialCharCount >= 2
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
    },
    validateNewPassword() {
      this.passwordErrors = []

      // Kuralları kontrol etmek için hesaplanmış özellikleri kullan
      if (!this.isNewPasswordLongEnough) {
        this.passwordErrors.push('Пароль должен содержать не менее 8 символов')
      }

      if (!this.isNewPasswordEnglishOnly) {
        this.passwordErrors.push('Пароль должен содержать только английские буквы, цифры и допустимые спецсимволы')
      }

      if (!this.hasNewPasswordUppercase) {
        this.passwordErrors.push('Пароль должен содержать хотя бы одну заглавную букву')
      }

      if (!this.hasNewPasswordEnoughSpecialChars) {
        this.passwordErrors.push('Пароль должен содержать хотя бы два специальных символа')
      }
    },
    async changePassword() {
      this.validateNewPassword() // Запускаем валидацию перед отправкой

      if (this.passwordErrors.length > 0) {
        this.$message.error('Пожалуйста, исправьте ошибки в новом пароле.')
        return
      }

      if (this.passwords.new !== this.passwords.confirm) {
        this.$message.error('Новый пароль и подтверждение не совпадают.')
        return
      }

      if (!this.passwords.current) {
        this.$message.error('Пожалуйста, введите текущий пароль.')
        return
      }

      try {
        const success = await this.profileStore.updatePassword(
          this.passwords.current,
          this.passwords.new
        )

        if (success) {
          this.$message.success('Пароль успешно изменен!')
          // Очищаем поля после успешной смены пароля
          this.passwords.current = ''
          this.passwords.new = ''
          this.passwords.confirm = ''
          this.passwordErrors = []
        } else {
          this.$message.error('Ошибка при смене пароля. Возможно, текущий пароль неверен или произошла ошибка на сервере.')
        }
      } catch (error) {
        console.error('Ошибка при смене пароля:', error)
        this.$message.error('Произошла непредвиденная ошибка при смене пароля.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.security-settings {
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
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;

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

  .setting-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;

    @include mobile {
      font-size: 0.8125rem;
    }

    @include xs-only {
      font-size: 0.75rem;
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

  input[type='password'],
  input[type='text'] {
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

  .password-input {
    position: relative;
    width: 100%;

    input {
      padding-right: 3rem; /* Пространство для кнопки переключения */
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
      font-size: 1rem;

      @include mobile {
        font-size: 0.9375rem;
        right: 0.625rem;
      }

      @include xs-only {
        font-size: 0.875rem;
        right: 0.5rem;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .password-hints {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    font-size: 0.8125rem;
    color: var(--text-secondary);

    @include mobile {
      font-size: 0.75rem;
    }

    @include xs-only {
      font-size: 0.6875rem;
    }

    li {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;

      &::before {
        content: '\2022'; /* Bullet point */
        margin-right: 0.5rem;
        color: var(--text-secondary);
      }

      &.valid {
        color: var(--success-color);

        &::before {
          content: '\2713'; /* Checkmark */
          color: var(--success-color);
        }
      }

      &.invalid {
        color: var(--danger-color);

        &::before {
          content: '\2717'; /* Cross mark */
          color: var(--danger-color);
        }
      }
    }
  }

  .text-danger {
    color: var(--danger-color);
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
}

.avatar-upload {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;

  &.dragging {
    .avatar-preview {
      border-color: var(--primary-color);
      transform: scale(1.05);
    }
  }
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--input-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border: 2px dashed var(--border-color);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  i {
    font-size: 2.5rem;
    color: var(--text-secondary);
  }
}

.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 0.5rem;

  i {
    font-size: 2rem;
    color: white;
  }

  span {
    font-size: 0.875rem;
  }
}

.hidden {
  display: none;
}

.avatar-actions {
  display: flex;
  gap: 0.5rem;
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;

  @include mobile {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.btn-outline {
      background-color: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-primary);

      &:hover {
        background-color: var(--bg-secondary);
      }
    }

    &.btn-primary {
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      color: #fff;

      &:hover {
        opacity: 0.9;
      }
    }
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

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--input-bg);

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
  }
}

.session-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  i {
    font-size: 1.25rem;
    color: var(--primary-color);

    @include mobile {
      font-size: 1.125rem;
    }
  }
}

.session-details {
  display: flex;
  flex-direction: column;

  .session-device {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9375rem;

    @include mobile {
      font-size: 0.875rem;
    }
  }

  .session-time {
    font-size: 0.8125rem;
    color: var(--text-secondary);

    @include mobile {
      font-size: 0.75rem;
    }
  }
}

.current-session {
  font-size: 0.8125rem;
  color: var(--primary-color);
  font-weight: 500;

  @include mobile {
    font-size: 0.75rem;
  }
}

.session-description {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
</style>
