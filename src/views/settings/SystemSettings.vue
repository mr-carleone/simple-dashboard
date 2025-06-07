<template>
  <div class="system-settings">
    <h3>Системные настройки</h3>

    <div class="settings-form">
      <div class="form-item">
        <label>Тема оформления</label>
        <el-select placeholder="Выберите тему">
          <el-option label="Светлая" value="light" />
          <el-option label="Темная" value="dark" />
        </el-select>
      </div>

      <div class="form-item">
        <label>Язык интерфейса</label>
        <el-select placeholder="Выберите язык">
          <el-option label="Русский" value="ru" />
          <el-option label="Английский" value="en" />
        </el-select>
      </div>

      <el-button type="primary" @click="saveSettings">Сохранить</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"; // Добавить эту строку
const saveSettings = () => {
  ElMessage.success("Системные настройки сохранены");
};
</script>

<style scoped>
.system-settings {
  max-width: 600px;
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

  .el-select {
    width: 100%;
  }
}
</style>
