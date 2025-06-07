<template>
  <div class="users-layout">
    <div class="users-header">
      <h1>Пользователи</h1>
      <div class="users-actions">
        <button class="btn btn-primary">
          <i class="fas fa-plus"></i>
          Добавить пользователя
        </button>
      </div>
    </div>

    <div class="users-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersLayout'
}
</script>

<style lang="scss" scoped>
.users-layout {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
}

.users-actions {
  display: flex;
  gap: 1rem;
}

.users-content {
  flex: 1;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  overflow: hidden;
}
</style>
