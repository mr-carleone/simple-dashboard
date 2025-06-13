<template>
  <div class="team-tasks">
    <div class="team-members">
      <div class="member-card" v-for="member in teamMembers" :key="member.id">
        <div class="member-info">
          <img :src="member.avatar" :alt="member.name" class="avatar" />
          <div class="member-details">
            <h3>{{ member.name }}</h3>
            <span class="role">{{ member.role }}</span>
          </div>
        </div>
        <div class="member-stats">
          <div class="stat">
            <span class="label">Активные</span>
            <span class="value">{{ member.stats.active }}</span>
          </div>
          <div class="stat">
            <span class="label">Выполнено</span>
            <span class="value">{{ member.stats.completed }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tasks-board">
      <div class="board-column" v-for="status in taskStatuses" :key="status.id">
        <div class="column-header">
          <h3>{{ status.title }}</h3>
          <span class="task-count">{{ getTasksByStatus(status.id).length }}</span>
        </div>
        <div class="task-list">
          <div
            v-for="task in getTasksByStatus(status.id)"
            :key="task.id"
            class="task-card"
            :class="{ 'high-priority': task.priority === 'high' }"
          >
            <div class="task-header">
              <h4>{{ task.title }}</h4>
              <span :class="['priority', task.priority]">
                {{ getPriorityText(task.priority) }}
              </span>
            </div>
            <p class="task-description">{{ task.description }}</p>
            <div class="task-footer">
              <div class="task-meta">
                <span class="due-date">
                  <i class="fas fa-calendar"></i>
                  {{ task.dueDate }}
                </span>
                <span class="assignee">
                  <img :src="task.assignee.avatar" :alt="task.assignee.name" class="avatar-small" />
                  {{ task.assignee.name }}
                </span>
              </div>
              <div class="task-actions">
                <button class="btn-icon" @click="editTask(task.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" @click="moveTask(task.id)">
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamTasks',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Иван Иванов',
          role: 'Team Lead',
          avatar: 'https://i.pravatar.cc/150?img=1',
          stats: {
            active: 5,
            completed: 12
          }
        },
        {
          id: 2,
          name: 'Петр Петров',
          role: 'Frontend Developer',
          avatar: 'https://i.pravatar.cc/150?img=2',
          stats: {
            active: 3,
            completed: 8
          }
        },
        {
          id: 3,
          name: 'Анна Сидорова',
          role: 'Backend Developer',
          avatar: 'https://i.pravatar.cc/150?img=3',
          stats: {
            active: 4,
            completed: 10
          }
        }
      ],
      taskStatuses: [
        { id: 'todo', title: 'К выполнению' },
        { id: 'in-progress', title: 'В работе' },
        { id: 'review', title: 'На проверке' },
        { id: 'done', title: 'Выполнено' }
      ],
      tasks: [
        {
          id: 1,
          title: 'Разработка API',
          description: 'Создание REST API для нового функционала',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-03-20',
          assignee: {
            name: 'Анна Сидорова',
            avatar: 'https://i.pravatar.cc/150?img=3'
          }
        },
        {
          id: 2,
          title: 'Интеграция с платежной системой',
          description: 'Подключение и тестирование платежного шлюза',
          status: 'todo',
          priority: 'high',
          dueDate: '2024-03-25',
          assignee: {
            name: 'Петр Петров',
            avatar: 'https://i.pravatar.cc/150?img=2'
          }
        },
        {
          id: 3,
          title: 'Оптимизация производительности',
          description: 'Улучшение скорости загрузки страниц',
          status: 'review',
          priority: 'medium',
          dueDate: '2024-03-18',
          assignee: {
            name: 'Иван Иванов',
            avatar: 'https://i.pravatar.cc/150?img=1'
          }
        }
      ]
    }
  },
  methods: {
    getTasksByStatus(status) {
      return this.tasks.filter(task => task.status === status)
    },
    getPriorityText(priority) {
      const priorityMap = {
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий'
      }
      return priorityMap[priority] || priority
    },
    editTask(id) {
      console.log('Редактирование задачи:', id)
    },
    moveTask(id) {
      console.log('Перемещение задачи:', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.team-tasks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.member-card {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow);

  .member-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .member-details {
      h3 {
        margin: 0;
        font-size: 1rem;
        color: var(--heading-color);
      }

      .role {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }

  .member-stats {
    display: flex;
    justify-content: space-around;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);

    .stat {
      text-align: center;

      .label {
        display: block;
        font-size: 0.75rem;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
      }

      .value {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--heading-color);
      }
    }
  }
}

.tasks-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.board-column {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 1rem;
  min-width: 300px;

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);

    h3 {
      margin: 0;
      font-size: 1rem;
      color: var(--heading-color);
    }

    .task-count {
      background: var(--bg-tertiary);
      color: var(--text-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
    }
  }
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100px;
}

.task-card {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow);

  &.high-priority {
    border-left: 3px solid var(--danger-color);
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;

    h4 {
      margin: 0;
      font-size: 0.875rem;
      color: var(--heading-color);
    }

    .priority {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;

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
  }

  .task-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 1rem;
  }

  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }

  .task-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: var(--text-secondary);

    .due-date {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      i {
        font-size: 0.75rem;
      }
    }

    .assignee {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      .avatar-small {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;

    .btn-icon {
      padding: 0.25rem;
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
    }
  }
}
</style>
