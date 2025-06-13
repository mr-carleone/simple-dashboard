<template>
  <div class="users-list">
    <div class="users-filters">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <label for="userSearch" class="sr-only">Поиск пользователей</label>
        <input
          type="text"
          id="userSearch"
          name="userSearch"
          v-model="searchQuery"
          placeholder="Поиск пользователей..."
          @input="handleSearch"
          autocomplete="off"
        />
      </div>
      <div class="filter-actions">
        <button class="btn btn-outline">
          <i class="fas fa-filter"></i>
          Фильтры
        </button>
      </div>
    </div>

    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <span class="status-badge" :class="user.status">
                {{ user.status }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-icon" @click="viewUser(user)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" @click="editUser(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon text-danger" @click="deleteUser(user)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  data() {
    return {
      searchQuery: '',
      users: [],
      loading: false,
      error: null
    }
  },
  methods: {
    handleSearch() {
      // Implement search logic
      console.log('Searching for:', this.searchQuery)
    },
    viewUser(user) {
      this.$router.push(`/users/${user.id}`)
    },
    editUser(user) {
      this.$router.push(`/users/${user.id}/edit`)
    },
    deleteUser(user) {
      if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
        // Implement delete logic
        console.log('Deleting user:', user)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.users-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
}

.users-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;

  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
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
}

.users-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      font-weight: 600;
      color: var(--text-secondary);
      background-color: var(--table-header-bg);
    }

    td {
      color: var(--text-primary);
    }
  }
}

.status-badge {
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

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }

  &.text-danger:hover {
    color: var(--danger-color);
  }
}
</style>
