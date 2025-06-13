<template>
    <div class="user-layout">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>Пользователи</span>
                            <el-button type="primary" @click="handleAddUser">
                                <font-awesome-icon :icon="['fas', 'user-plus']" /> Добавить пользователя
                            </el-button>
                        </div>
                    </template>

                    <el-table :data="users" style="width: 100%">
                        <el-table-column prop="fullName" label="ФИО" />
                        <el-table-column prop="email" label="Email" />
                        <el-table-column prop="position" label="Должность" />
                        <el-table-column prop="factory" label="Завод" />
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
                </el-card>
            </el-col>
        </el-row>

        <!-- Модальное окно добавления/редактирования пользователя -->
        <el-dialog v-model="showUserDialog" :title="isEditing ? 'Редактировать пользователя' : 'Добавить пользователя'"
            width="500px">
            <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="140px">
                <el-form-item label="ФИО" prop="fullName">
                    <el-input v-model="userForm.fullName" placeholder="Введите ФИО" />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="userForm.email" placeholder="Введите email" />
                </el-form-item>
                <el-form-item label="Должность" prop="position">
                    <el-input v-model="userForm.position" placeholder="Введите должность" />
                </el-form-item>
                <el-form-item label="Завод" prop="factory">
                    <el-select v-model="userForm.factory" placeholder="Выберите завод" style="width: 100%">
                        <el-option v-for="factory in factories" :key="factory.id" :label="factory.fullName"
                            :value="factory.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Роль" prop="role">
                    <el-select v-model="userForm.role" placeholder="Выберите роль" style="width: 100%">
                        <el-option label="Администратор" value="admin" />
                        <el-option label="Менеджер" value="manager" />
                        <el-option label="Пользователь" value="user" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showUserDialog = false">Отмена</el-button>
                    <el-button type="primary" @click="saveUser">
                        {{ isEditing ? 'Сохранить' : 'Добавить' }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserLayout',
    data() {
        return {
            showUserDialog: false,
            isEditing: false,
            userForm: {
                fullName: '',
                email: '',
                position: '',
                factory: '',
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
                factory: [
                    { required: true, message: 'Пожалуйста, выберите завод', trigger: 'change' }
                ],
                role: [
                    { required: true, message: 'Пожалуйста, выберите роль', trigger: 'change' }
                ]
            },
            users: [
                {
                    id: 1,
                    fullName: 'Иванов Иван Иванович',
                    email: 'ivanov@example.com',
                    position: 'Начальник цеха',
                    factory: 'Промпроект',
                    role: 'admin'
                },
                {
                    id: 2,
                    fullName: 'Петров Петр Петрович',
                    email: 'petrov@example.com',
                    position: 'Менеджер',
                    factory: 'Кавказ Цемент',
                    role: 'manager'
                }
            ],
            factories: [
                {
                    id: 1,
                    name: 'PMP',
                    fullName: 'Промпроект'
                },
                {
                    id: 2,
                    name: 'KAV',
                    fullName: 'Кавказ Цемент'
                },
                {
                    id: 3,
                    name: 'MIH',
                    fullName: 'Михайлов Цемент'
                }
            ]
        }
    },
    methods: {
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
        handleAddUser() {
            this.isEditing = false
            this.userForm = {
                fullName: '',
                email: '',
                position: '',
                factory: '',
                role: ''
            }
            this.showUserDialog = true
        },
        handleEditUser(user) {
            this.isEditing = true
            this.userForm = { ...user }
            this.showUserDialog = true
        },
        handleDeleteUser(user) {
            this.$confirm('Вы уверены, что хотите удалить этого пользователя?', 'Предупреждение', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }).then(() => {
                const index = this.users.findIndex(u => u.id === user.id)
                if (index !== -1) {
                    this.users.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: 'Пользователь успешно удален'
                    })
                }
            })
        },
        saveUser() {
            this.$refs.userFormRef.validate((valid) => {
                if (valid) {
                    if (this.isEditing) {
                        // Обновление существующего пользователя
                        const index = this.users.findIndex(u => u.id === this.userForm.id)
                        if (index !== -1) {
                            this.users[index] = { ...this.userForm }
                        }
                    } else {
                        // Добавление нового пользователя
                        const newUser = {
                            ...this.userForm,
                            id: this.users.length + 1
                        }
                        this.users.push(newUser)
                    }

                    this.showUserDialog = false
                    this.$message({
                        type: 'success',
                        message: this.isEditing ? 'Пользователь успешно обновлен' : 'Пользователь успешно добавлен'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.user-layout {
    margin-top: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
