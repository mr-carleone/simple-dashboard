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

            <div class="users-section">
                <div class="section-header">
                    <h3>Пользователи завода</h3>
                    <el-button type="primary" @click="handleAddUser">
                        <font-awesome-icon :icon="['fas', 'user-plus']" /> Добавить пользователя
                    </el-button>
                </div>
                <el-table :data="factoryUsers" style="width: 100%">
                    <el-table-column prop="fullName" label="ФИО" />
                    <el-table-column prop="email" label="Email" />
                    <el-table-column prop="position" label="Должность" />
                    <el-table-column prop="role" label="Роль">
                        <template #default="{ row }">
                            <el-tag :type="getRoleType(row.role)">
                                {{ getRoleLabel(row.role) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Действия" width="150">
                        <template #default="{ row }">
                            <el-button-group>
                                <el-button type="primary" size="small" @click="handleEditUser(row)">
                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                </el-button>
                                <el-button type="danger" size="small" @click="handleDeleteUser(row)">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <!-- Модальное окно редактирования пользователя -->
        <el-dialog v-model="showEditUserDialog" title="Редактировать пользователя" width="500px">
            <el-form :model="editingUser" :rules="userRules" ref="editUserForm" label-width="140px">
                <el-form-item label="ФИО" prop="fullName">
                    <el-input v-model="editingUser.fullName" placeholder="Введите ФИО" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="editingUser.email" placeholder="Введите email" />
                </el-form-item>
                <el-form-item label="Должность" prop="position">
                    <el-input v-model="editingUser.position" placeholder="Введите должность" />
                </el-form-item>
                <el-form-item label="Роль" prop="role">
                    <el-select v-model="editingUser.role" placeholder="Выберите роль" style="width: 100%">
                        <el-option label="Администратор" value="admin" />
                        <el-option label="Менеджер" value="manager" />
                        <el-option label="Пользователь" value="user" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showEditUserDialog = false">Отмена</el-button>
                    <el-button type="primary" @click="saveUserEdit">
                        Сохранить
                    </el-button>
                </span>
            </template>
        </el-dialog>
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
            factoryUsers: [
                {
                    id: 1,
                    fullName: 'Иванов Иван Иванович',
                    email: 'ivanov@example.com',
                    position: 'Начальник цеха',
                    role: 'admin'
                },
                {
                    id: 2,
                    fullName: 'Петров Петр Петрович',
                    email: 'petrov@example.com',
                    position: 'Менеджер',
                    role: 'manager'
                },
                {
                    id: 3,
                    fullName: 'Сидоров Сидор Сидорович',
                    email: 'sidorov@example.com',
                    position: 'Оператор',
                    role: 'user'
                }
            ],
            showEditUserDialog: false,
            editingUser: null,
            userRules: {
                fullName: [
                    { required: true, message: 'Пожалуйста, введите ФИО', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Пожалуйста, введите email', trigger: 'blur' },
                    { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: 'Пожалуйста, введите должность', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: 'Пожалуйста, выберите роль', trigger: 'change' }
                ]
            }
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
        getRoleType(role) {
            const types = {
                'admin': 'danger',
                'manager': 'warning',
                'user': 'info'
            }
            return types[role] || 'info'
        },
        getRoleLabel(role) {
            const labels = {
                'admin': 'Администратор',
                'manager': 'Менеджер',
                'user': 'Пользователь'
            }
            return labels[role] || role
        },
        handleViewRequest(request) {
            console.log('View request:', request)
        },
        handleAddUser() {
            this.$router.push('/sova/factories')
        },
        handleEditUser(user) {
            this.editingUser = { ...user }
            this.showEditUserDialog = true
        },
        saveUserEdit() {
            this.$refs.editUserForm.validate((valid) => {
                if (valid) {
                    // Находим индекс пользователя в массиве
                    const index = this.factoryUsers.findIndex(u => u.id === this.editingUser.id)
                    if (index !== -1) {
                        // Обновляем данные пользователя
                        this.factoryUsers[index] = { ...this.editingUser }

                        // Закрываем диалог
                        this.showEditUserDialog = false

                        // Показываем уведомление об успехе
                        this.$message({
                            type: 'success',
                            message: 'Пользователь успешно обновлен'
                        })
                    }
                }
            })
        },
        handleDeleteUser(user) {
            this.$confirm('Вы уверены, что хотите удалить этого пользователя?', 'Предупреждение', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }).then(() => {
                // Удаляем пользователя из массива
                const index = this.factoryUsers.findIndex(u => u.id === user.id)
                if (index !== -1) {
                    this.factoryUsers.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: 'Пользователь успешно удален'
                    })
                }
            })
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
    }
}
</script>

<style scoped>
.factory-details {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h2 {
    margin: 0;
}

.requests-section,
.users-section {
    margin-top: 30px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h3 {
    margin: 0;
    color: var(--el-text-color-primary);
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
