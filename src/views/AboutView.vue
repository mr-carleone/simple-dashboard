<template>
  <div>
    <h1>О приложении</h1>

    <el-alert type="info">
      Это демонстрационное приложение на Vue 3 с использованием:
      <ul>
        <li>Vite</li>
        <li>Vue Router</li>
        <li>Pinia</li>
        <li>Element Plus</li>
        <li>SCSS</li>
      </ul>
    </el-alert>

    <div class="about-info">
      <p>Текущая версия: <strong>1.0.0</strong></p>
      <p>
        Название приложения: <strong>{{ appName }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "@/store";

const store = useMainStore();
const appName = computed(() => store.appName);
</script>

<style scoped>
.about-info {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
