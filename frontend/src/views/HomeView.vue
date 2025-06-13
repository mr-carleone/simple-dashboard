<template>
  <div class="home-view">
    <h1>Главная страница</h1>
    <p>Добро пожаловать в приложение!</p>

    <div class="card">
      <h2>Статистика</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in stats" :key="item.title">
          <div class="stat-card">
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-title">{{ item.title }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { title: 'Пользователи', value: 124 },
  { title: 'Группы', value: 12 },
  { title: 'Сообщения', value: 2456 },
  { title: 'Задачи', value: 18 }
]
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.home-view {
  padding: 1.5rem;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
  }
}

h1 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;

  @include mobile {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  @include xs-only {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
}

p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;

  @include mobile {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  @include xs-only {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
}

.card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  @include mobile {
    padding: 1rem;
    margin-top: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
    margin-top: 0.75rem;
  }

  h2 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: 1rem;

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

.el-row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px; /* Для компенсации padding в el-col */

  @include mobile {
    margin: -5px;
  }
}

.el-col {
  padding: 10px;
  box-sizing: border-box;

  @include mobile {
    padding: 5px;
    flex: 0 0 50%; /* 2 колонки на мобильных */
    max-width: 50%;
  }

  @include xs-only {
    flex: 0 0 100%; /* 1 колонка на очень маленьких экранах */
    max-width: 100%;
  }
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: var(--input-bg);
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
  }
}

.stat-value {
  font-size: 2.25rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;

  @include mobile {
    font-size: 1.75rem;
  }

  @include xs-only {
    font-size: 1.5rem;
  }
}

.stat-title {
  font-size: 1rem;
  color: var(--text-secondary);

  @include mobile {
    font-size: 0.9rem;
  }

  @include xs-only {
    font-size: 0.8rem;
  }
}
</style>
