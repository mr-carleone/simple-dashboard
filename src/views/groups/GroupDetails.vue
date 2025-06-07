<template>
  <div class="group-details">
    <div class="group-header">
      <div class="group-info">
        <h2>{{ group.name }}</h2>
        <p class="description">{{ group.description }}</p>
      </div>
      <div class="group-actions">
        <button class="btn" @click="editGroup">
          <i class="fas fa-edit"></i>
          Редактировать
        </button>
        <button class="btn danger" @click="deleteGroup">
          <i class="fas fa-trash"></i>
          Удалить
        </button>
      </div>
    </div>

    <div class="group-content">
      <div class="group-section">
        <h3>Информация о группе</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Статус</span>
            <span :class="['status', group.status]">
              {{ group.status === 'active' ? 'Активна' : 'Неактивна' }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">Участников</span>
            <span class="value">{{ group.membersCount }}</span>
          </div>
          <div class="info-item">
            <span class="label">Создана</span>
            <span class="value">{{ group.createdAt }}</span>
          </div>
          <div class="info-item">
            <span class="label">Последнее обновление</span>
            <span class="value">{{ group.updatedAt }}</span>
          </div>
        </div>
      </div>

      <div class="group-section">
        <div class="section-header">
          <h3>Участники группы</h3>
          <button class="btn">
            <i class="fas fa-user-plus"></i>
            Добавить участника
          </button>
        </div>
        <div class="members-table">
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in group.members" :key="member.id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.role }}</td>
                <td>
                  <div class="actions">
                    <button class="btn-icon" @click="editMember(member.id)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" @click="removeMember(member.id)">
                      <i class="fas fa-user-minus"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupDetails',
  data() {
    return {
      group: {
        id: 1,
        name: 'Администраторы',
        description: 'Группа администраторов системы',
        status: 'active',
        membersCount: 5,
        createdAt: '01.01.2024',
        updatedAt: '15.03.2024',
        members: [
          {
            id: 1,
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            role: 'Администратор'
          },
          {
            id: 2,
            name: 'Петр Петров',
            email: 'petr@example.com',
            role: 'Модератор'
          }
        ]
      }
    }
  },
  methods: {
    editGroup() {
      this.$router.push(`/groups/${this.group.id}/edit`)
    },
    deleteGroup() {
      if (confirm('Вы уверены, что хотите удалить эту группу?')) {
        // Здесь будет логика удаления
        console.log('Удаление группы:', this.group.id)
      }
    },
    editMember(memberId) {
      console.log('Редактирование участника:', memberId)
    },
    removeMember(memberId) {
      if (confirm('Вы уверены, что хотите удалить этого участника из группы?')) {
        // Здесь будет логика удаления участника
        console.log('Удаление участника:', memberId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);

  .group-info {
    h2 {
      margin: 0 0 0.5rem;
      color: var(--heading-color);
    }

    .description {
      color: var(--text-secondary);
      margin: 0;
    }
  }

  .group-actions {
    display: flex;
    gap: 1rem;
  }
}

.group-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.group-section {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);

  h3 {
    margin: 0 0 1.5rem;
    color: var(--heading-color);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      margin: 0;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .label {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .value {
      color: var(--text-color);
      font-weight: 500;
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

.members-table {
  overflow-x: auto;

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
