<template>
    <div class="sova-layout">
        <el-card class="sova-header">
            <div class="header-content">
                <h1>Управление Sova</h1>
                <el-menu mode="horizontal" :router="true" :default-active="activeMenu" class="sova-menu">
                    <el-menu-item index="/sova/factories">
                        <font-awesome-icon :icon="['fas', 'industry']" />
                        Заводы
                    </el-menu-item>
                </el-menu>
            </div>
        </el-card>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'SovaLayout',
    computed: {
        activeMenu() {
            return this.$route.path
        }
    }
}
</script>

<style scoped>
.sova-layout {
    padding: 20px;
}

.sova-header {
    margin-bottom: 20px;
}

.header-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.header-content h1 {
    margin: 0;
    color: var(--el-text-color-primary);
}

.sova-menu {
    border-bottom: none;
}

.sova-menu :deep(.el-menu-item) {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
