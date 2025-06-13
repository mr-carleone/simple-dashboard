<template>
  <div class="user-edit">
    <div class="edit-header">
      <h2>Редактирование пользователя</h2>
      <div class="edit-actions">
        <button class="btn btn-outline" @click="goBack">
          <i class="fas fa-times"></i>
          Отмена
        </button>
        <button class="btn btn-primary" @click="saveUser">
          <i class="fas fa-save"></i>
          Сохранить
        </button>
      </div>
    </div>

    <form class="edit-form" @submit.prevent="saveUser">
      <div class="form-grid">
        <div class="form-section">
          <h3>Основная информация</h3>
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text"
id="name"
v-model="user.name"
required
autocomplete="name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email"
id="email"
v-model="user.email"
required
autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="role">Роль</label>
            <select id="role" v-model="user.role" required>
              <option value="Admin">Администратор</option>
              <option value="Editor">Редактор</option>
              <option value="User">Пользователь</option>
            </select>
          </div>
          <div class="form-group">
            <label for="status">Статус</label>
            <select id="status" v-model="user.status" required>
              <option value="active">Активный</option>
              <option value="inactive">Неактивный</option>
              <option value="pending">Ожидает</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3>Дополнительная информация</h3>
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input type="tel"
id="phone"
v-model="user.phone"
autocomplete="tel" />
          </div>
          <div class="form-group">
            <label for="address">Адрес</label>
            <input type="text"
id="address"
v-model="user.address"
autocomplete="address-line1" />
          </div>
          <div class="form-group">
            <label for="company">Компания</label>
            <input type="text"
id="company"
v-model="user.company"
autocomplete="organization" />
          </div>
          <div class="form-group">
            <label for="position">Должность</label>
            <input type="text"
id="position"
v-model="user.position"
autocomplete="organization-title" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data() {
    return {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'active',
        phone: '+1 234 567 890',
        address: 'New York, USA',
        company: 'Tech Corp',
        position: 'Senior Developer'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push(`/users/${this.user.id}`)
    },
    saveUser() {
      // Implement save logic
      console.log('Saving user:', this.user)
      this.goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-edit {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
}

.edit-actions {
  display: flex;
  gap: 1rem;
}

.edit-form {
  flex: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.form-section {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;

  h3 {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    color: var(--text-primary);
  }
}

.form-group {
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  input,
  select {
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

  select {
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .edit-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
