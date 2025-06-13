<template>
  <div>
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

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-card {
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.stat-title {
  margin-top: 8px;
  color: #606266;
}
</style>
