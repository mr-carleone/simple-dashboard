<template>
  <div class="profile-settings">
    <div class="settings-section">
      <h2>Личная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label>Аватар</label>
          <div class="avatar-upload">
            <div class="avatar-preview">
              <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" />
              <i v-else class="fas fa-user"></i>
            </div>
            <div class="avatar-actions">
              <button class="btn btn-outline" @click="uploadAvatar">
                <i class="fas fa-upload"></i>
                Загрузить
              </button>
              <button v-if="profile.avatar" class="btn btn-outline text-danger" @click="removeAvatar">
                <i class="fas fa-trash"></i>
                Удалить
              </button>
            </div>
          </div>
        </div>

        <div class="setting-item">
          <label for="name">Имя</label>
          <input type="text"
id="name"
v-model="profile.name"
placeholder="Введите ваше имя" />
        </div>

        <div class="setting-item">
          <label for="email">Email</label>
          <input type="email"
id="email"
v-model="profile.email"
placeholder="Введите ваш email" />
        </div>

        <div class="setting-item">
          <label for="phone">Телефон</label>
          <input type="tel"
id="phone"
v-model="profile.phone"
placeholder="Введите ваш телефон" />
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2>Дополнительная информация</h2>
      <div class="settings-grid">
        <div class="setting-item">
          <label for="company">Компания</label>
          <input type="text"
id="company"
v-model="profile.company"
placeholder="Введите название компании" />
        </div>

        <div class="setting-item">
          <label for="position">Должность</label>
          <input type="text"
id="position"
v-model="profile.position"
placeholder="Введите вашу должность" />
        </div>

        <div class="setting-item">
          <label for="bio">О себе</label>
          <textarea id="bio"
v-model="profile.bio"
placeholder="Расскажите о себе"
rows="4"></textarea>
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
  </div>
</template>

<script>
export default {
  name: 'ProfileSettings',
  data() {
    return {
      profile: {
        avatar: null,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        company: 'Tech Corp',
        position: 'Senior Developer',
        bio: 'Full-stack developer with 5 years of experience in web development.'
      },
      defaultProfile: null
    }
  },
  created() {
    // Сохраняем начальные данные профиля для возможности сброса
    this.defaultProfile = JSON.parse(JSON.stringify(this.profile))
  },
  methods: {
    uploadAvatar() {
      // Здесь будет логика загрузки аватара
      console.log('Uploading avatar...')
    },
    removeAvatar() {
      this.profile.avatar = null
    },
    saveProfile() {
      // Здесь будет логика сохранения профиля
      console.log('Saving profile:', this.profile)
    },
    resetProfile() {
      this.profile = JSON.parse(JSON.stringify(this.defaultProfile))
    }
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
    min-height: 100px;
  }
}

.avatar-upload {
  display: flex;
  gap: 1.5rem;
  align-items: center;
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

.avatar-actions {
  display: flex;
  gap: 0.5rem;
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

  .avatar-upload {
    flex-direction: column;
    align-items: flex-start;
  }

  .settings-actions {
    flex-direction: column;
  }
}
</style>
