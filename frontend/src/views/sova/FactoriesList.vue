<template>
    <div class="factories-list">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>Заводы</span>
                            <el-button type="primary" @click="handleAddUserClick" :disabled="!selectedFactory">
                                <font-awesome-icon :icon="['fas', 'user-plus']" /> Добавить пользователя
                            </el-button>
                        </div>
                    </template>

                    <el-table :data="factories" style="width: 100%" @row-click="handleRowClick">
                        <el-table-column prop="name" label="Название завода" />
                        <el-table-column prop="fullName" label="Полное название" />
                        <el-table-column prop="requests" label="Количество заявок" />
                        <el-table-column prop="status" label="Статус">
                            <template #default="{ row }">
                                <el-tag :type="row.status === 'active' ? 'success' : 'warning'">
                                    {{ row.status === 'active' ? 'Активен' : 'Неактивен' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Действия" width="120">
                            <template #default="{ row }">
                                <el-button type="primary" @click.stop="handleViewFactory(row)">
                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

        <!-- Модальное окно добавления пользователя -->
        <el-dialog v-model="showAddUserDialog" title="Добавить пользователя" width="500px">
            <el-form :model="newUser" :rules="userRules" ref="userForm" label-width="140px">
                <el-form-item label="Завод" prop="factory">
                    <el-input v-model="selectedFactory.fullName" disabled />
                </el-form-item>
                <el-form-item label="ФИО" prop="fullName">
                    <el-input v-model="newUser.fullName" placeholder="Введите ФИО" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="newUser.email" placeholder="Введите email" />
                </el-form-item>
                <el-form-item label="Должность" prop="position">
                    <el-input v-model="newUser.position" placeholder="Введите должность" />
                </el-form-item>
                <el-form-item label="Роль" prop="role">
                    <el-select v-model="newUser.role" placeholder="Выберите роль" style="width: 100%">
                        <el-option label="Администратор" value="admin" />
                        <el-option label="Менеджер" value="manager" />
                        <el-option label="Пользователь" value="user" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showAddUserDialog = false">Отмена</el-button>
                    <el-button type="primary" @click="handleAddUser">
                        Добавить
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'FactoriesList',
    data() {
        return {
            showAddUserDialog: false,
            selectedFactory: null,
            newUser: {
                fullName: '',
                email: '',
                position: '',
                role: ''
            },
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
            },
            factories: [
                {
                    id: 1,
                    name: 'PMP',
                    fullName: 'Промпроект',
                    status: 'active',
                    requests: 15
                },
                {
                    id: 2,
                    name: 'KAV',
                    fullName: 'Кавказ Цемент',
                    status: 'active',
                    requests: 8
                },
                {
                    id: 3,
                    name: 'MIH',
                    fullName: 'Михайлов Цемент',
                    status: 'active',
                    requests: 12
                }
            ]
        }
    },
    methods: {
        handleViewFactory(factory) {
            this.$router.push(`/sova/factories/${factory.id}`)
        },
        handleRowClick(row) {
            this.selectedFactory = row
        },
        handleAddUserClick() {
            if (this.selectedFactory) {
                this.showAddUserDialog = true
            } else {
                this.$message({
                    type: 'warning',
                    message: 'Пожалуйста, выберите завод'
                })
            }
        },
        handleAddUser() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    // Здесь будет логика добавления пользователя
                    const userData = {
                        ...this.newUser,
                        factoryId: this.selectedFactory.id,
                        factoryName: this.selectedFactory.name
                    }

                    // Пример отправки данных на сервер
                    console.log('Добавление пользователя:', userData)

                    // Очистка формы и закрытие диалога
                    this.$refs.userForm.resetFields()
                    this.showAddUserDialog = false

                    // Показываем уведомление об успехе
                    this.$message({
                        type: 'success',
                        message: 'Пользователь успешно добавлен'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.factories-list {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-button-group {
    .el-button {
        padding: 5px 10px;
    }
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
