<template>
  <div class="profile-settings">
    <div class="settings-section">
      <h2>Личная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label>Аватар</label>
          <div class="avatar-upload"
               @dragover.prevent
               @dragenter.prevent="isDragging = true"
               @dragleave.prevent="isDragging = false"
               @drop.prevent="handleDrop"
               :class="{ 'dragging': isDragging }">
            <div class="avatar-preview">
              <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" />
              <i v-else class="fas fa-user"></i>
              <div v-if="isDragging" class="drop-overlay">
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Отпустите для загрузки</span>
              </div>
            </div>
            <div class="avatar-actions">
              <label class="btn btn-outline">
                <i class="fas fa-upload"></i>
                Загрузить
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
              </label>
              <button v-if="profile.avatar" class="btn btn-outline text-danger" @click="removeAvatar">
                <i class="fas fa-trash"></i>
                Удалить
              </button>
            </div>
          </div>
        </div>

        <div class="setting-item">
          <label for="name">Имя</label>
          <input type="text" id="name" v-model="profile.name" placeholder="Введите ваше имя" />
        </div>

        <div class="setting-item">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="profile.email" placeholder="Введите ваш email" />
        </div>

        <div class="setting-item">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" v-model="profile.phone" placeholder="Введите ваш телефон" />
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Дополнительная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="company">Компания</label>
          <input type="text" id="company" v-model="profile.company" placeholder="Введите название компании" />
        </div>

        <div class="setting-item">
          <label for="position">Должность</label>
          <input type="text" id="position" v-model="profile.position" placeholder="Введите вашу должность" />
        </div>

        <div class="setting-item">
          <label for="bio">О себе</label>
          <textarea id="bio" v-model="profile.bio" placeholder="Расскажите о себе" rows="4"></textarea>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="btn btn-outline" @click="resetProfile">
        <i class="fas fa-undo"></i>
        Сбросить
      </button>
      <button class="btn btn-primary" @click="saveProfile">
        <i class="fas fa-save"></i>
        Сохранить
      </button>
    </div>

    <!-- Секция смены пароля была здесь и будет перемещена в SecuritySettings.vue -->
  </div>
</template>

<script>
import { useProfileStore } from '@/store/profile'
import { ref } from 'vue'

export default {
  name: 'ProfileSettings',
  setup() {
    const profileStore = useProfileStore()
    return { profileStore }
  },
  data() {
    return {
      colors: [
        { value: '#3498db', name: 'Blue' },
        { value: '#2ecc71', name: 'Green' },
        { value: '#e74c3c', name: 'Red' },
        { value: '#f1c40f', name: 'Yellow' },
        { value: '#9b59b6', name: 'Purple' }
      ],
      isDragging: false,
      // currentPassword: '', // Перемещены в SecuritySettings.vue
      // newPassword: '', // Перемещены в SecuritySettings.vue
      // confirmPassword: '', // Перемещены в SecuritySettings.vue
      // passwordErrors: [] // Перемещены в SecuritySettings.vue
    }
  },
  computed: {
    profile: {
      get() {
        return this.profileStore.profile
      },
      set(value) {
        this.profileStore.profile = value
      }
    },
    // isNewPasswordLongEnough: null, // Перемещены в SecuritySettings.vue
    // isNewPasswordEnglishOnly: null, // Перемещены в SecuritySettings.vue
    // hasNewPasswordUppercase: null, // Перемещены в SecuritySettings.vue
    // hasNewPasswordEnoughSpecialChars: null // Перемещены в SecuritySettings.vue
  },
  async created() {
    await this.profileStore.loadProfile()
  },
  methods: {
    async handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        await this.processImage(file)
      }
    },
    async handleDrop(event) {
      this.isDragging = false
      const file = event.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        await this.processImage(file)
      } else {
        this.$message.error('Пожалуйста, загрузите изображение')
      }
    },
    async processImage(file) {
      try {
        // Проверяем размер файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.$message.error('Размер файла не должен превышать 5MB')
          return
        }

        // Заглушка для функционала загрузки
        this.$message({
          message: 'Функционал загрузки аватара находится в разработке. В будущем будет реализована интеграция с файловым хранилищем.',
          type: 'info',
          duration: 8000,
          showClose: true
        })

        const reader = new FileReader()
        reader.onload = async (e) => {
          const success = await this.profileStore.updateAvatar(e.target.result)
          if (success) {
            // Если успешно обновили в store, обновляем UI
            this.profile.avatar = e.target.result
          } else {
            this.$message.error('Ошибка при обновлении аватара')
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error)
        this.$message.error('Ошибка при загрузке файла')
      }
    },
    async removeAvatar() {
      // Заглушка для функционала удаления
      this.$message({
        message: 'Функционал удаления аватара находится в разработке.',
        type: 'info',
        duration: 8000,
        showClose: true
      })

      // Вызываем действие removeAvatar из store
      const success = await this.profileStore.removeAvatar()
      if (success) {
        // Если успешно удалили из store, обновляем UI
        this.profile.avatar = null
      } else {
        this.$message.error('Ошибка при удалении аватара')
      }
    },
    async saveProfile() {
      const success = await this.profileStore.saveProfile(this.profile)
      if (success) {
        this.$message.success('Профиль успешно сохранен')
      } else {
        this.$message.error('Ошибка при сохранении профиля')
      }
    },
    resetProfile() {
      this.profileStore.loadProfile()
      this.$message.success('Профиль сброшен')
    },
    // validateNewPassword() { ... }, // Перемещены в SecuritySettings.vue
    // async changePassword() { ... } // Перемещены в SecuritySettings.vue
  }
}
</script>

<style lang="scss" scoped>
.profile-settings {
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
}
</style>
