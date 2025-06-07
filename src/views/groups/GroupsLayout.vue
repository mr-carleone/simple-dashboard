<template>
  <div class="groups-layout">
    <div class="groups-header">
      <h1>Группы</h1>
      <div class="groups-actions">
        <button class="btn">
          <i class="fas fa-plus"></i>
          Новая группа
        </button>
      </div>
    </div>
    <div class="groups-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupsLayout'
}
</script>

<style lang="scss" scoped>
.groups-layout {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.groups-header {
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

.groups-actions {
  display: flex;
  gap: 1rem;
}

.groups-content {
  flex: 1;
  overflow: auto;
}
</style>
