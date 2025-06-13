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
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.profile-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @include mobile {
    padding: 1.5rem;
  }

  @include xs-only {
    padding: 1rem;
  }
}

.profile-header {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);

  @include mobile {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  @include xs-only {
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
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

  @include mobile {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }

  @include xs-only {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
}

.profile-info {
  h1 {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.75rem;
    }

    @include xs-only {
      font-size: 1.5rem;
    }
  }

  .profile-email {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 1rem;

    @include mobile {
      font-size: 0.9rem;
    }

    @include xs-only {
      font-size: 0.8rem;
    }
  }

  .profile-position {
    color: var(--text-secondary);
    font-size: 1.1rem;

    @include mobile {
      font-size: 1rem;
    }

    @include xs-only {
      font-size: 0.9rem;
    }

    span {
      color: var(--text-tertiary);
    }
  }
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include mobile {
    gap: 1.5rem;
  }

  @include xs-only {
    gap: 1rem;
  }
}

.profile-section {
  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }

    @include xs-only {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @include xs-only {
    gap: 0.5rem;
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 0.5rem;

  @include mobile {
    padding: 0.75rem;
  }

  @include xs-only {
    padding: 0.6rem;
  }

  i {
    font-size: 1.25rem;
    color: var(--primary-color);

    @include mobile {
      font-size: 1.125rem;
    }

    @include xs-only {
      font-size: 1rem;
    }
  }

  span {
    color: var(--text-primary);
    font-size: 0.9rem;

    @include mobile {
      font-size: 0.8rem;
    }

    @include xs-only {
      font-size: 0.75rem;
    }
  }
}

.profile-bio {
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-line;
  font-size: 1rem;

  @include mobile {
    font-size: 0.9rem;
  }

  @include xs-only {
    font-size: 0.8rem;
  }
}

.profile-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;

  @include mobile {
    margin-top: 1.5rem;
    justify-content: center;
  }

  .btn {
    @include mobile {
      width: 100%;
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
  }
}
</style>
