<template>
    <div class="factory-details">
        <el-card v-if="factory">
            <template #header>
                <div class="card-header">
                    <h2>{{ factory.fullName }} ({{ factory.name }})</h2>
                    <el-button-group>
                        <el-button type="primary" @click="handleEdit">
                            <font-awesome-icon :icon="['fas', 'edit']" /> Редактировать
                        </el-button>
                        <el-button type="danger" @click="handleDelete">
                            <font-awesome-icon :icon="['fas', 'trash']" /> Удалить
                        </el-button>
                    </el-button-group>
                </div>
            </template>

            <el-descriptions :column="2" border>
                <el-descriptions-item label="Название завода">{{ factory.fullName }}</el-descriptions-item>
                <el-descriptions-item label="Код завода">{{ factory.name }}</el-descriptions-item>
                <el-descriptions-item label="Статус">
                    <el-tag :type="factory.status === 'active' ? 'success' : 'warning'">
                        {{ factory.status === 'active' ? 'Активен' : 'Неактивен' }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Количество заявок">{{ factory.requests }}</el-descriptions-item>
            </el-descriptions>

            <div class="requests-section">
                <h3>Заявки на автотранспорт</h3>
                <el-table :data="factoryRequests" style="width: 100%">
                    <el-table-column prop="id" label="№" width="80" />
                    <el-table-column prop="date" label="Дата заявки" width="150" />
                    <el-table-column prop="type" label="Тип транспорта" />
                    <el-table-column prop="purpose" label="Цель" />
                    <el-table-column prop="status" label="Статус">
                        <template #default="{ row }">
                            <el-tag :type="getStatusType(row.status)">
                                {{ row.status }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Действия" width="120">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="handleViewRequest(row)">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'FactoryDetails',
    data() {
        return {
            factory: {
                id: 1,
                name: 'PMP',
                fullName: 'Промпроект',
                status: 'active',
                requests: 15
            },
            factoryRequests: [
                {
                    id: 1,
                    date: '2024-03-20',
                    type: 'Грузовой',
                    purpose: 'Доставка материалов',
                    status: 'В обработке'
                },
                {
                    id: 2,
                    date: '2024-03-19',
                    type: 'Пассажирский',
                    purpose: 'Трансфер сотрудников',
                    status: 'Выполнено'
                },
                {
                    id: 3,
                    date: '2024-03-18',
                    type: 'Грузовой',
                    purpose: 'Вывоз продукции',
                    status: 'Отменено'
                }
            ],
        }
    },
    methods: {
        getStatusType(status) {
            const types = {
                'В обработке': 'warning',
                'Выполнено': 'success',
                'Отменено': 'danger'
            }
            return types[status] || 'info'
        },
        handleViewRequest(request) {
            console.log('View request:', request)
        },
        handleEdit() {
            this.$router.push(`/sova/factories/${this.factory.id}/edit`)
        },
        handleDelete() {
            this.$confirm('Вы уверены, что хотите удалить этот завод?', 'Предупреждение', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }).then(() => {
                this.$router.push('/sova/factories')
            })
        }
    },
    created() {
        // this.fetchFactoryDetails(); // Если был метод загрузки деталей завода, он останется
    }
}
</script>

<style scoped>
.factory-details {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.card-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--el-text-color-primary);
}

.el-button-group .el-button {
    padding: 8px 12px;
}

.requests-section,
.users-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--el-border-color-lighter);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.section-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--el-text-color-regular);
}

.el-table {
    margin-top: 15px;
}

.dialog-footer {
    text-align: right;
}
</style>
