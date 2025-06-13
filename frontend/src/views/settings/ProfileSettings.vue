<template>
  <div class="profile-settings">
    <div class="settings-section">
      <h2>Личная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="avatarUpload">Аватар</label>
          <div class="avatar-upload"
               @dragover.prevent
               @dragenter.prevent="isDragging = true"
               @dragleave.prevent="isDragging = false"
               @drop.prevent="handleDrop"
               :class="{ 'dragging': isDragging }">
            <div class="avatar-preview">
              <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" />
              <font-awesome-icon v-else :icon="['fas', 'user']" class="default-avatar"></font-awesome-icon>
              <div v-if="isDragging" class="drop-overlay">
                <font-awesome-icon :icon="['fas', 'cloud-upload-alt']"></font-awesome-icon>
                <span>Отпустите для загрузки</span>
              </div>
            </div>
            <div class="avatar-actions">
              <label class="btn-icon" title="Загрузить">
                <font-awesome-icon :icon="['fas', 'upload']"></font-awesome-icon>
                <input
                  type="file"
                  id="avatarUpload"
                  name="avatarUpload"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
              </label>
              <button v-if="profile.avatar" class="btn-icon text-danger" @click="removeAvatar" title="Удалить">
                <font-awesome-icon :icon="['fas', 'trash']"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="setting-item">
          <label for="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="profile.name"
            placeholder="Введите ваше имя"
            autocomplete="name"
          />
        </div>

        <div class="setting-item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="profile.email"
            placeholder="Введите ваш email"
            autocomplete="email"
          />
        </div>

        <div class="setting-item">
          <label for="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            v-model="profile.phone"
            placeholder="Введите ваш телефон"
            autocomplete="tel"
          />
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Дополнительная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="company">Компания</label>
          <input
            type="text"
            id="company"
            name="company"
            v-model="profile.company"
            placeholder="Введите название компании"
            autocomplete="organization"
          />
        </div>

        <div class="setting-item">
          <label for="position">Должность</label>
          <input
            type="text"
            id="position"
            name="position"
            v-model="profile.position"
            placeholder="Введите вашу должность"
            autocomplete="organization-title"
          />
        </div>

        <div class="setting-item">
          <label for="bio">О себе</label>
          <textarea
            id="bio"
            name="bio"
            v-model="profile.bio"
            placeholder="Расскажите о себе"
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="btn btn-outline" @click="resetProfile">
        <font-awesome-icon :icon="['fas', 'undo']"></font-awesome-icon>
        <span>Сбросить</span>
      </button>
      <button class="btn btn-primary" @click="saveProfile">
        <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/store/profile'

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
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.profile-settings {
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
  input[type='email'],
  input[type='tel'],
  textarea {
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
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--el-fill-color-light);
  border: 2px dashed var(--el-border-color);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--el-color-primary);
  }

  &.dragging {
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

.avatar-preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .default-avatar {
    font-size: 48px;
    color: var(--el-text-color-secondary);
  }
}

.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  svg {
    font-size: 24px;
    margin-bottom: 8px;
  }

  span {
    font-size: 12px;
  }
}

.avatar-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-upload:hover .avatar-actions {
  opacity: 1;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--el-color-primary);
    color: white;
  }

  &.text-danger:hover {
    background-color: var(--el-color-danger);
    color: white;
  }

  svg {
    font-size: 16px;
  }
}

.hidden {
  display: none;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    @include mobile {
      width: 100%;
    }

    .font-awesome-icon {
      font-size: 1rem;
      vertical-align: middle;
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
