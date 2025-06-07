<template>
  <div class="profile-settings">
    <h3>Настройки профиля</h3>

    <div class="profile-header">
      <el-avatar :size="80" :src="user.avatar" />
      <div class="profile-info">
        <h4>{{ user.name }}</h4>
        <p>{{ user.email }}</p>
      </div>
    </div>

    <div class="settings-form">
      <div class="form-item">
        <label>Имя пользователя</label>
        <el-input v-model="user.name" />
      </div>

      <div class="form-item">
        <label>Email</label>
        <el-input v-model="user.email" type="email" />
      </div>

      <div class="form-item">
        <label>Новый пароль</label>
        <el-input v-model="password" type="password" show-password />
      </div>

      <el-button type="primary" @click="saveProfile"
        >Сохранить изменения</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const user = ref({
  name: "Иван Иванов",
  email: "ivan@example.com",
  avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
});

const password = ref("");

const saveProfile = () => {
  ElMessage.success("Профиль успешно обновлен");
};
</script>

<style scoped>
.profile-settings {
  max-width: 600px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.profile-info h4 {
  margin: 0;
  font-size: 1.3rem;
}

.profile-info p {
  margin: 5px 0 0;
  color: #777;
}

.settings-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
}
</style>
