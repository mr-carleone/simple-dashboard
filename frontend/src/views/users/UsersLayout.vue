<template>
  <div class="users-layout">
    <el-card class="users-card">
      <template #header>
        <div class="card-header">
          <h2>Пользователи</h2>
          <el-button type="primary" @click="showAddUserDialog">
            Добавить пользователя
          </el-button>
        </div>
      </template>

      <el-table :data="users" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="Аватар" width="80">
          <template #default="{ row }">
            <img :src="row.avatar_url" alt="User Avatar" class="user-avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="Имя пользователя" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="is_active" label="Статус">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'danger'">
              {{ row.is_active ? 'Активен' : 'Неактивен' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="Роль">
          <template #default="{ row }">
            <el-tag :type="getRoleTagType(row.role)">
              {{ getRoleLabel(row.role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Действия" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="editUser(row)">
                Редактировать
              </el-button>
              <el-button size="small" type="danger" @click="confirmDelete(row)">
                Удалить
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Диалог добавления/редактирования пользователя -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? 'Редактировать пользователя' : 'Добавить пользователя'"
      width="500px"
      class="user-dialog"
    >
      <el-form
        ref="userForm"
        :model="currentUser"
        :rules="rules"
        class="user-form"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="currentUser.email" />
        </el-form-item>
        <el-form-item label="Имя пользователя" prop="username">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="currentUser.password" type="password" />
        </el-form-item>
        <el-form-item label="Роль" prop="role">
          <el-select v-model="currentUser.role" placeholder="Выберите роль" style="width: 100%;">
            <el-option label="Администратор" value="admin"></el-option>
            <el-option label="Менеджер" value="manager"></el-option>
            <el-option label="Пользователь" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Статус" prop="is_active">
          <el-switch v-model="currentUser.is_active" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Отмена</el-button>
          <el-button type="primary" @click="saveUser">
            {{ isEditing ? 'Сохранить' : 'Добавить' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Диалог подтверждения удаления -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="Подтверждение удаления"
      width="400px"
    >
      <p>Вы уверены, что хотите удалить пользователя {{ userToDelete?.username }}?</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Отмена</el-button>
          <el-button type="danger" @click="handleDelete">Удалить</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { createUser, getUsers, updateUser, deleteUser } from '@/api/users'

const users = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const isEditing = ref(false)
const userToDelete = ref(null)

const currentUser = ref({
  email: '',
  username: '',
  password: '',
  is_active: true,
  role: 'user'
})

const rules = {
  email: [
    { required: true, message: 'Пожалуйста, введите email', trigger: 'blur' },
    { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' }
  ],
  username: [
    { required: true, message: 'Пожалуйста, введите имя пользователя', trigger: 'blur' },
    { min: 3, message: 'Имя пользователя должно быть не менее 3 символов', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
    { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
  ],
  role: [
    { required: true, message: 'Пожалуйста, выберите роль', trigger: 'change' }
  ]
}

const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } catch (error) {
    ElMessage.error('Ошибка при загрузке пользователей')
  } finally {
    loading.value = false
  }
}

const showAddUserDialog = () => {
  isEditing.value = false
  currentUser.value = {
    email: '',
    username: '',
    password: '',
    is_active: true,
    role: 'user'
  }
  dialogVisible.value = true
}

const editUser = (user) => {
  isEditing.value = true
  currentUser.value = { ...user, password: '' }
  dialogVisible.value = true
}

const saveUser = async () => {
  try {
    if (isEditing.value) {
      await updateUser(currentUser.value.id, currentUser.value)
      ElMessage.success('Пользователь успешно обновлен')
    } else {
      await createUser(currentUser.value)
      ElMessage.success('Пользователь успешно создан')
    }
    dialogVisible.value = false
    fetchUsers()
  } catch (error) {
    ElMessage.error(`Ошибка при сохранении пользователя: ${error.message}`)
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  deleteDialogVisible.value = true
}

const handleDelete = async () => {
  try {
    await deleteUser(userToDelete.value.id)
    ElMessage.success('Пользователь успешно удален')
    deleteDialogVisible.value = false
    fetchUsers()
  } catch (error) {
    ElMessage.error('Ошибка при удалении пользователя')
  }
}

const getRoleTagType = (role) => {
  const types = {
    'admin': 'danger',
    'manager': ''
  }
  return types[role] || 'info'
}

const getRoleLabel = (role) => {
  const labels = {
    'admin': 'Администратор',
    'manager': 'Менеджер',
    'user': 'Пользователь'
  }
  return labels[role] || role
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-layout {
  padding: 20px;
}

.users-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border-color);
}

/* Общие стили для меток и контента формы */
.user-form .el-form-item {
  display: flex;
  align-items: baseline;
  margin-bottom: 18px;
}

.user-form .el-form-item__label {
  width: 280px; /* Фиксированная ширина для меток на десктопе (увеличено) */
  text-align: right; /* Выравнивание по правому краю */
  padding-right: 12px; /* Отступ справа от метки */
  white-space: nowrap; /* Запретить перенос текста метки */
  box-sizing: border-box;
}

.user-form .el-form-item__content {
  flex: 1;
}

/* Стили для диалога на маленьких экранах */
@media (max-width: 768px) {
  .user-dialog {
    width: 95% !important;
    max-width: 95vw !important;
    min-width: 300px !important;
  }

  .user-dialog .el-dialog__body {
    padding: 10px !important;
  }

  .user-form .el-form-item {
    flex-direction: column; /* Элементы в колонку */
    align-items: flex-start; /* Выравнивание по левому краю */
    margin-bottom: 15px;
  }

  .user-form .el-form-item__label {
    width: 100% !important; /* Метка занимает всю ширину */
    text-align: left !important;
    padding-bottom: 5px;
    padding-right: 0 !important;
    white-space: normal; /* Разрешить перенос текста метки на мобильных */
    display: block; /* Убедимся, что метка занимает отдельную строку */
  }

  .user-form .el-form-item__content {
    margin-left: 0 !important; /* Убираем отступ */
    width: 100% !important; /* Контент занимает всю ширину */
  }

  /* Убедимся, что инпуты и селекты занимают всю ширину */
  .user-form .el-input, .user-form .el-select {
    width: 100% !important;
  }
}
</style>
