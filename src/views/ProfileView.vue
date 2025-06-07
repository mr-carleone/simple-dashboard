<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-info">
        <div class="profile-avatar">
          <img :src="user.avatar" :alt="user.name">
          <button class="avatar-edit" title="Изменить фото">
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <div class="profile-details">
          <h1>{{ user.name }}</h1>
          <p class="profile-role">{{ user.role }}</p>
          <p class="profile-email">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-stats">
        <div class="stat-card">
          <i class="fas fa-tasks"></i>
          <div class="stat-info">
            <span class="stat-value">{{ stats.activeTasks }}</span>
            <span class="stat-label">Активные задачи</span>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-check-circle"></i>
          <div class="stat-info">
            <span class="stat-value">{{ stats.completedTasks }}</span>
            <span class="stat-label">Выполнено задач</span>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-users"></i>
          <div class="stat-info">
            <span class="stat-value">{{ stats.teams }}</span>
            <span class="stat-label">Команд</span>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-project-diagram"></i>
          <div class="stat-info">
            <span class="stat-value">{{ stats.projects }}</span>
            <span class="stat-label">Проектов</span>
          </div>
        </div>
      </div>

      <div class="profile-sections">
        <div class="profile-section">
          <h2>О себе</h2>
          <p>{{ user.bio || 'Нет информации' }}</p>
        </div>

        <div class="profile-section">
          <h2>Навыки</h2>
          <div class="skills-list">
            <span v-for="skill in user.skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="profile-section">
          <h2>Последняя активность</h2>
          <div class="activity-list">
            <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
              <i :class="activity.icon"></i>
              <div class="activity-info">
                <span class="activity-text">{{ activity.text }}</span>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Иван Иванов',
  role: 'Старший разработчик',
  email: 'ivan@example.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  bio: 'Full-stack разработчик с опытом работы более 5 лет. Специализируюсь на Vue.js и Node.js.',
  skills: ['Vue.js', 'Node.js', 'TypeScript', 'SCSS', 'Docker', 'Git']
})

const stats = ref({
  activeTasks: 12,
  completedTasks: 156,
  teams: 3,
  projects: 8
})

const recentActivity = ref([
  {
    id: 1,
    icon: 'fas fa-check-circle',
    text: 'Завершил задачу "Реализация авторизации"',
    time: '2 часа назад'
  },
  {
    id: 2,
    icon: 'fas fa-comment',
    text: 'Оставил комментарий в задаче "Дизайн дашборда"',
    time: '5 часов назад'
  },
  {
    id: 3,
    icon: 'fas fa-user-plus',
    text: 'Присоединился к проекту "Мобильное приложение"',
    time: '1 день назад'
  }
])
</script>

<style lang="scss" scoped>
.profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  position: relative;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: var(--bg-secondary);
  box-shadow: var(--shadow-lg);
}

.profile-cover {
  height: 200px;
  background: linear-gradient(45deg, var(--primary-color), var(--primary-color-dark));
}

.profile-info {
  padding: 0 2rem 2rem;
  margin-top: -60px;
  display: flex;
  gap: 2rem;
  align-items: flex-end;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid var(--bg-primary);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-edit {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

.profile-details {
  h1 {
    margin: 0;
    font-size: 2rem;
    color: var(--text-primary);
  }

  .profile-role {
    color: var(--primary-color);
    font-size: 1.1rem;
    margin: 0.5rem 0;
  }

  .profile-email {
    color: var(--text-secondary);
    margin: 0;
  }
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-md);

  i {
    font-size: 2rem;
    color: var(--primary-color);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}

.profile-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.profile-section {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);

  h2 {
    margin: 0 0 1rem 0;
    color: var(--text-primary);
    font-size: 1.2rem;
  }
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  i {
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .activity-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .activity-text {
    color: var(--text-primary);
  }

  .activity-time {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 1rem 1rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
