<template>
  <section class="about">
    <div class="about-header">
      <i class="fas fa-info-circle about-icon"></i>
      <h1>О проекте</h1>
      <p class="about-lead">Простая и современная панель управления для командной работы, задач и пользователей.</p>
    </div>
    <div class="about-content">
      <div class="about-card">
        <i class="fas fa-users"></i>
        <h2>Для команд</h2>
        <p>Управляйте пользователями, группами и ролями. Совместная работа и прозрачность процессов.</p>
      </div>
      <div class="about-card">
        <i class="fas fa-tasks"></i>
        <h2>Задачи и проекты</h2>
        <p>Создавайте, отслеживайте и анализируйте задачи. Гибкая система фильтрации и календарь.</p>
      </div>
      <div class="about-card">
        <i class="fas fa-cogs"></i>
        <h2>Гибкие настройки</h2>
        <p>Персонализируйте рабочее пространство, темы, безопасность и интеграции.</p>
      </div>
    </div>
    <div class="about-footer">
      <div class="about-contact">
        <i class="fas fa-envelope"></i>
        <span>Связаться: <a href="mailto:support@example.com">support@example.com</a></span>
      </div>
      <div class="about-social">
        <a href="#" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="#" title="Telegram"><i class="fab fa-telegram"></i></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style lang="scss" scoped>
.about {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-header {
  text-align: center;
  .about-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  h1 {
    margin: 0.5rem 0 0.25rem 0;
    font-size: 2.2rem;
    font-weight: 700;
  }
  .about-lead {
    color: var(--text-secondary);
    font-size: 1.1rem;
    margin-bottom: 0;
  }
}

.about-content {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.about-card {
  background: var(--bg-tertiary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: 1.5rem 1rem;
  flex: 1 1 220px;
  min-width: 200px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0.5rem 0 0.25rem 0;
  }
  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
}

.about-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  .about-contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    i {
      color: var(--primary-color);
      font-size: 1.2rem;
    }
    a {
      color: var(--primary-color);
      text-decoration: underline;
    }
  }
  .about-social {
    display: flex;
    gap: 1rem;
    a {
      color: var(--text-secondary);
      font-size: 1.5rem;
      transition: color 0.2s;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

@media (max-width: 700px) {
  .about-content {
    flex-direction: column;
    align-items: stretch;
  }
  .about-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
