<template>
  <div class="my-tasks">
    <div class="tasks-filters">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Поиск задач..." />
      </div>
      <div class="filters">
        <select v-model="statusFilter">
          <option value="">Все статусы</option>
          <option value="todo">К выполнению</option>
          <option value="in-progress">В работе</option>
          <option value="review">На проверке</option>
          <option value="done">Выполнено</option>
        </select>
        <select v-model="priorityFilter">
          <option value="">Все приоритеты</option>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>
    </div>

    <div class="tasks-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <div class="task-title">
            <input type="checkbox" :checked="task.status === 'done'" @change="toggleTaskStatus(task)" />
            <h3>{{ task.title }}</h3>
          </div>
          <div class="task-actions">
            <button class="btn-icon" @click="editTask(task.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon danger" @click="deleteTask(task.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="task-description">{{ task.description }}</p>
        <div class="task-footer">
          <div class="task-meta">
            <span :class="['status', task.status]">
              {{ getStatusText(task.status) }}
            </span>
            <span :class="['priority', task.priority]">
              {{ getPriorityText(task.priority) }}
            </span>
            <span class="due-date">
              <i class="fas fa-calendar"></i>
              {{ task.dueDate }}
            </span>
          </div>
          <div class="task-assignee">
            <img :src="task.assignee.avatar" :alt="task.assignee.name" class="avatar" />
            <span>{{ task.assignee.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTasks',
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      priorityFilter: '',
      tasks: [
        {
          id: 1,
          title: 'Разработка нового функционала',
          description: 'Реализовать систему уведомлений для пользователей',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-03-20',
          assignee: {
            name: 'Иван Иванов',
            avatar: 'https://i.pravatar.cc/150?img=1'
          }
        },
        {
          id: 2,
          title: 'Исправление багов',
          description: 'Исправить ошибки в форме авторизации',
          status: 'todo',
          priority: 'medium',
          dueDate: '2024-03-18',
          assignee: {
            name: 'Петр Петров',
            avatar: 'https://i.pravatar.cc/150?img=2'
          }
        },
        {
          id: 3,
          title: 'Обновление документации',
          description: 'Обновить API документацию',
          status: 'review',
          priority: 'low',
          dueDate: '2024-03-15',
          assignee: {
            name: 'Анна Сидорова',
            avatar: 'https://i.pravatar.cc/150?img=3'
          }
        }
      ]
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchesSearch =
          task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesStatus = !this.statusFilter || task.status === this.statusFilter
        const matchesPriority = !this.priorityFilter || task.priority === this.priorityFilter
        return matchesSearch && matchesStatus && matchesPriority
      })
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        todo: 'К выполнению',
        'in-progress': 'В работе',
        review: 'На проверке',
        done: 'Выполнено'
      }
      return statusMap[status] || status
    },
    getPriorityText(priority) {
      const priorityMap = {
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий'
      }
      return priorityMap[priority] || priority
    },
    toggleTaskStatus(task) {
      task.status = task.status === 'done' ? 'todo' : 'done'
    },
    editTask(id) {
      console.log('Редактирование задачи:', id)
    },
    deleteTask(id) {
      if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
        console.log('Удаление задачи:', id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-tasks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tasks-filters {
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
    display: flex;
    gap: 1rem;

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

.tasks-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.task-card {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow);

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;

    .task-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      input[type='checkbox'] {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
      }

      h3 {
        margin: 0;
        font-size: 1rem;
        color: var(--heading-color);
      }
    }
  }

  .task-description {
    color: var(--text-secondary);
    margin: 0 0 1rem;
    font-size: 0.875rem;
  }

  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .task-meta {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 500;

    &.todo {
      background: var(--warning-color);
      color: white;
    }

    &.in-progress {
      background: var(--info-color);
      color: white;
    }

    &.review {
      background: var(--primary-color);
      color: white;
    }

    &.done {
      background: var(--success-color);
      color: white;
    }
  }

  .priority {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 500;

    &.high {
      background: var(--danger-color);
      color: white;
    }

    &.medium {
      background: var(--warning-color);
      color: white;
    }

    &.low {
      background: var(--success-color);
      color: white;
    }
  }

  .due-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);

    i {
      font-size: 0.875rem;
    }
  }

  .task-assignee {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);

    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .task-actions {
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
}
</style>
