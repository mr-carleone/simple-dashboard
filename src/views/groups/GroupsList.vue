<template>
  <div class="groups-list">
    <div class="groups-filters">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Поиск групп..."
        >
      </div>
      <div class="filters">
        <select v-model="statusFilter">
          <option value="">Все статусы</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>
    </div>

    <div class="groups-table">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Участники</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in filteredGroups" :key="group.id">
            <td>{{ group.name }}</td>
            <td>{{ group.description }}</td>
            <td>{{ group.membersCount }}</td>
            <td>
              <span :class="['status', group.status]">
                {{ group.status === 'active' ? 'Активна' : 'Неактивна' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-icon" @click="viewGroup(group.id)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" @click="editGroup(group.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon danger" @click="deleteGroup(group.id)">
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
  name: 'GroupsList',
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      groups: [
        {
          id: 1,
          name: 'Администраторы',
          description: 'Группа администраторов системы',
          membersCount: 5,
          status: 'active'
        },
        {
          id: 2,
          name: 'Модераторы',
          description: 'Группа модераторов',
          membersCount: 10,
          status: 'active'
        },
        {
          id: 3,
          name: 'Пользователи',
          description: 'Обычные пользователи',
          membersCount: 100,
          status: 'active'
        }
      ]
    }
  },
  computed: {
    filteredGroups() {
      return this.groups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            group.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesStatus = !this.statusFilter || group.status === this.statusFilter
        return matchesSearch && matchesStatus
      })
    }
  },
  methods: {
    viewGroup(id) {
      this.$router.push(`/groups/${id}`)
    },
    editGroup(id) {
      this.$router.push(`/groups/${id}/edit`)
    },
    deleteGroup(id) {
      if (confirm('Вы уверены, что хотите удалить эту группу?')) {
        // Здесь будет логика удаления
        console.log('Удаление группы:', id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.groups-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.groups-filters {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  .search-box {
    position: relative;
    flex: 1;
    min-width: 200px;

    i {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }

    input {
      width: 100%;
      padding: 0.5rem 0.75rem 0.5rem 2.5rem;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: var(--input-bg);
      color: var(--text-color);

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }

  .filters {
    select {
      padding: 0.5rem 2rem 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: var(--input-bg);
      color: var(--text-color);
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }
}

.groups-table {
  overflow-x: auto;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }

    th {
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--bg-tertiary);
    }

    td {
      color: var(--text-color);
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    background: var(--success-color);
    color: white;
  }

  &.inactive {
    background: var(--danger-color);
    color: white;
  }
}

.actions {
  display: flex;
  gap: 0.5rem;

  .btn-icon {
    padding: 0.5rem;
    border: none;
    background: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: var(--border-radius);
    transition: all var(--transition-normal);

    &:hover {
      background: var(--bg-tertiary);
      color: var(--text-color);
    }

    &.danger:hover {
      background: var(--danger-color);
      color: white;
    }
  }
}
</style>
