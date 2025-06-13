<template>
  <div class="user-details">
    <div class="user-header">
      <div class="user-info">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-meta">
          <h2>{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
      <div class="user-actions">
        <button class="btn btn-outline" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Назад
        </button>
        <button class="btn btn-primary" @click="editUser">
          <i class="fas fa-edit"></i>
          Редактировать
        </button>
      </div>
    </div>

    <div class="user-content">
      <div class="info-card">
        <h3>Основная информация</h3>
        <div class="info-grid">
          <div class="info-item">
            <label for="userId">ID</label>
            <span id="userId">{{ user.id }}</span>
          </div>
          <div class="info-item">
            <label for="userRole">Роль</label>
            <span id="userRole">{{ user.role }}</span>
          </div>
          <div class="info-item">
            <label for="userStatus">Статус</label>
            <span id="userStatus" class="status-badge" :class="user.status">{{ user.status }}</span>
          </div>
          <div class="info-item">
            <label for="userCreatedAt">Дата регистрации</label>
            <span id="userCreatedAt">{{ user.registeredAt }}</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>Дополнительная информация</h3>
        <div class="info-grid">
          <div class="info-item">
            <label for="userPhone">Телефон</label>
            <span id="userPhone">{{ user.phone || 'Не указан' }}</span>
          </div>
          <div class="info-item">
            <label for="userAddress">Адрес</label>
            <span id="userAddress">{{ user.address || 'Не указан' }}</span>
          </div>
          <div class="info-item">
            <label for="userCompany">Компания</label>
            <span id="userCompany">{{ user.company || 'Не указана' }}</span>
          </div>
          <div class="info-item">
            <label for="userPosition">Должность</label>
            <span id="userPosition">{{ user.position || 'Не указана' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  data() {
    return {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'active',
        registeredAt: '2024-01-01',
        phone: '+1 234 567 890',
        address: 'New York, USA',
        company: 'Tech Corp',
        position: 'Senior Developer'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/users')
    },
    editUser() {
      this.$router.push(`/users/${this.user.id}/edit`)
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.user-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @include mobile {
    padding: 1rem;
    gap: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .user-actions {
    display: flex;
    gap: 1rem;

    @include mobile {
      width: 100%;
      justify-content: flex-end;
    }

    .btn {
      @include mobile {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;

  @include mobile {
    width: 100%;
  }
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;

  @include mobile {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
  }

  @include xs-only {
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }
}

.user-meta {
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.25rem;
    }

    @include xs-only {
      font-size: 1.125rem;
    }
  }

  .user-email {
    margin: 0.25rem 0 0;
    color: var(--text-secondary);
    font-size: 0.9rem;

    @include mobile {
      font-size: 0.8rem;
    }

    @include xs-only {
      font-size: 0.75rem;
    }
  }
}

.user-content {
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

.info-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.125rem;
      margin-bottom: 0.75rem;
    }

    @include xs-only {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

  span {
    color: var(--text-primary);
    font-size: 0.9375rem;

    @include mobile {
      font-size: 0.875rem;
    }

    @include xs-only {
      font-size: 0.8125rem;
    }
  }
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;

  &.active {
    background-color: var(--success-bg);
    color: var(--success-color);
  }

  &.inactive {
    background-color: var(--danger-bg);
    color: var(--danger-color);
  }

  @include mobile {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
