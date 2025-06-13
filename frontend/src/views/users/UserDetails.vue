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
            <label>ID</label>
            <span>{{ user.id }}</span>
          </div>
          <div class="info-item">
            <label>Роль</label>
            <span>{{ user.role }}</span>
          </div>
          <div class="info-item">
            <label>Статус</label>
            <span class="status-badge" :class="user.status">{{ user.status }}</span>
          </div>
          <div class="info-item">
            <label>Дата регистрации</label>
            <span>{{ user.registeredAt }}</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>Дополнительная информация</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>Телефон</label>
            <span>{{ user.phone || 'Не указан' }}</span>
          </div>
          <div class="info-item">
            <label>Адрес</label>
            <span>{{ user.address || 'Не указан' }}</span>
          </div>
          <div class="info-item">
            <label>Компания</label>
            <span>{{ user.company || 'Не указана' }}</span>
          </div>
          <div class="info-item">
            <label>Должность</label>
            <span>{{ user.position || 'Не указана' }}</span>
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
.user-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
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
}

.user-meta {
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }

  .user-email {
    margin: 0.25rem 0 0;
    color: var(--text-secondary);
  }
}

.user-actions {
  display: flex;
  gap: 1rem;
}

.user-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;

  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: var(--text-primary);
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  span {
    color: var(--text-primary);
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

  &.pending {
    background-color: var(--warning-bg);
    color: var(--warning-color);
  }
}

@media (max-width: 768px) {
  .user-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
