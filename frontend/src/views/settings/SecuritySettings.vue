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
              @input="validateNewPassword"
              placeholder="Введите новый пароль"
            />
            <button class="toggle-password" @click="showNewPassword = !showNewPassword">
              <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <ul v-if="passwords.new.length > 0 || passwordErrors.length > 0" class="password-hints">
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
              v-model="passwords.confirm"
              placeholder="Подтвердите новый пароль"
            />
            <button class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <p v-if="passwords.confirm.length > 0 && passwords.new !== passwords.confirm" class="text-danger">Пароли не совпадают</p>
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
          <label class="checkbox-label">
            <input type="checkbox" v-model="security.twoFactor" />
            <span>Включить двухфакторную аутентификацию</span>
          </label>
          <p class="setting-description">Добавьте дополнительный уровень безопасности к вашей учетной записи</p>
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
              <button v-if="!session.current" class="btn btn-outline text-danger" @click="terminateSession(session)">
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
import { useProfileStore } from '@/store/profile'
import { computed } from 'vue'

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
      return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\'\"\\\\|,.<>\/?~\u0060]*$/.test(this.passwords.new)
    },
    hasNewPasswordUppercase() {
      return /[A-Z]/.test(this.passwords.new)
    },
    hasNewPasswordEnoughSpecialChars() {
      const specialCharCount = (this.passwords.new.match(/[!@#$%^&*()_+\-=\[\]{};:\'\"\\\\|,.<>\/?~\u0060]/g) || []).length
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
      const newPass = this.passwords.new

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

  input[type='text'],
  input[type='email'],
  input[type='tel'],
  input[type='password'],
  textarea {
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

  .password-input {
    position: relative;
    width: 100%;
  }

  .password-input input {
    padding-right: 2.5rem; /* Make space for the toggle button */
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
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  .password-hints {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    color: var(--text-secondary);

    li {
      margin-bottom: 0.25rem;

      &.valid {
        color: var(--success-color);
      }
      &.invalid {
        color: var(--danger-color);
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

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .avatar-upload {
    flex-direction: column;
    align-items: flex-start;
  }

  .settings-actions {
    flex-direction: column;
  }

  .session-item {
    flex-direction: column; /* Элементы сессии располагаются вертикально */
    align-items: flex-start; /* Выравнивание элементов по левому краю */
    justify-content: flex-start; /* Выравнивание контента по верху */
    gap: 0.5rem; /* Вертикальный отступ между элементами */
    box-sizing: border-box; /* Учитываем padding и border в общей ширине */
    padding: 1rem; /* Сохраняем внутренние отступы */
    width: 100%; /* Элемент занимает всю доступную ширину */

    .session-info {
      display: flex; /* Делаем flex-контейнером */
      flex-direction: column; /* Иконка и детали располагаются вертикально */
      align-items: flex-start; /* Выравнивание иконки и деталей по левому краю */
      width: 100%; /* Занимает всю доступную ширину */
      margin-bottom: 0; /* Сброс нижнего отступа */
      box-sizing: border-box; /* Учитываем padding и border */

      .session-details {
        width: 100%; /* Детали занимают всю доступную ширину */
        box-sizing: border-box; /* Учитываем padding и border */
        span {
          display: block; /* Каждый span на новой строке */
          width: 100%; /* Занимает всю доступную ширину */
          overflow-wrap: break-word; /* Разрешаем перенос длинных слов */
          text-align: left; /* Выравнивание текста по левому краю */
        }
      }
    }

    .btn, .current-session {
      width: 100%; /* Кнопки/спаны занимают всю ширину */
      margin-left: 0; /* Убираем левый отступ */
      text-align: center; /* Центрируем текст кнопок */
      box-sizing: border-box; /* Учитываем padding и border */
    }
  }
}

.session-details {
  display: flex;
  flex-direction: column;
  flex: 1; /* Allow it to grow and shrink */
  min-width: 0; /* Important for flex items with long content */

  span {
    overflow-wrap: break-word; /* Allow long words to break */
  }
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--input-bg);

  // .btn {
  //   flex-shrink: 0;
  //   margin-left: 1rem;
  // }
}

.session-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-session {
  padding: 0.75rem 1.5rem; /* Match button padding */
  border-radius: 0.5rem; /* Match button border-radius */
  background-color: var(--success-color); /* Give it a subtle background */
  color: #fff; /* Ensure text color is readable */
  text-align: center; /* Center the text */
  flex-shrink: 0; /* Prevent it from shrinking */
}
</style>
