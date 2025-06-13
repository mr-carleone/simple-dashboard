<template>
  <div class="profile-view">
    <div class="profile-header">
      <div class="profile-avatar">
        <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" />
        <i v-else class="fas fa-user"></i>
      </div>
      <div class="profile-info">
        <h1>{{ profile.name }}</h1>
        <p class="profile-email">{{ profile.email }}</p>
        <p v-if="profile.position" class="profile-position">
          {{ profile.position }}
          <span v-if="profile.company">в {{ profile.company }}</span>
        </p>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section">
        <h2>Контактная информация</h2>
        <div class="info-grid">
          <div class="info-item" v-if="profile.phone">
            <i class="fas fa-phone"></i>
            <span>{{ profile.phone }}</span>
          </div>
          <div class="info-item" v-if="profile.email">
            <i class="fas fa-envelope"></i>
            <span>{{ profile.email }}</span>
          </div>
        </div>
      </div>

      <div class="profile-section" v-if="profile.bio">
        <h2>О себе</h2>
        <p class="profile-bio">{{ profile.bio }}</p>
      </div>

      <div class="profile-actions">
        <router-link to="/settings/profile" class="btn btn-primary">
          <i class="fas fa-edit"></i>
          Редактировать профиль
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useProfileStore } from '@/store/profile'

export default {
  name: 'ProfileView',
  setup() {
    const profileStore = useProfileStore()
    return { profileStore }
  },
  computed: {
    profile() {
      return this.profileStore.profile
    }
  },
  async created() {
    await this.profileStore.loadProfile()
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  i {
    font-size: 3rem;
    color: var(--text-secondary);
  }
}

.profile-info {
  h1 {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    color: var(--text-primary);
  }

  .profile-email {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .profile-position {
    color: var(--text-secondary);
    font-size: 1.1rem;

    span {
      color: var(--text-tertiary);
    }
  }
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;

  i {
    font-size: 1.25rem;
    color: var(--primary-color);
  }

  span {
    color: var(--text-primary);
  }
}

.profile-bio {
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-line;
}

.profile-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
