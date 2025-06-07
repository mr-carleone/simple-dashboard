<template>
  <div class="tasks-layout">
    <div class="tasks-header">
      <h1>Задачи</h1>
      <div class="tasks-actions">
        <button class="btn">
          <i class="fas fa-plus"></i>
          Новая задача
        </button>
      </div>
    </div>
    <div class="tasks-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksLayout'
}
</script>

<style lang="scss" scoped>
.tasks-layout {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);

  h1 {
    margin: 0;
    color: var(--heading-color);
  }
}

.tasks-actions {
  display: flex;
  gap: 1rem;
}

.tasks-content {
  flex: 1;
  overflow: auto;
}
</style>
