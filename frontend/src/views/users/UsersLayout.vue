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
            <img
              :src="row.avatar_url || getDefaultAvatar(row.username)"
              alt="User Avatar"
              class="user-avatar"
              @error="handleAvatarError"
            />
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
import { userApi } from '@/api/users'

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

// Функция для получения аватара по умолчанию
const getDefaultAvatar = (username) => {
  const name = username ? encodeURIComponent(username) : 'User'
  return `https://ui-avatars.com/api/?background=random&name=${name}&size=128`
}

// Обработчик ошибки загрузки аватара
const handleAvatarError = (event) => {
  event.target.src = getDefaultAvatar('') // Устанавливаем общий аватар по умолчанию при ошибке
}

const fetchUsers = async () => {
  try {
    const response = await userApi.getAllUsers()
    users.value = response.data
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error)
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
      await handleUpdateUser(currentUser.value.id, currentUser.value)
      ElMessage.success('Пользователь успешно обновлен')
    } else {
      await handleCreateUser(currentUser.value)
      ElMessage.success('Пользователь успешно создан')
    }
    dialogVisible.value = false
    fetchUsers()
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error)
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  deleteDialogVisible.value = true
}

const handleDelete = async () => {
  try {
    await handleDeleteUser(userToDelete.value.id)
    ElMessage.success('Пользователь успешно удален')
    deleteDialogVisible.value = false
    fetchUsers()
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error)
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

const handleCreateUser = async (userData) => {
  try {
    await userApi.createUser(userData)
    await fetchUsers()
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error)
  }
}

const handleUpdateUser = async (userId, userData) => {
  try {
    await userApi.updateUser(userId, userData)
    await fetchUsers()
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error)
  }
}

const handleDeleteUser = async (userId) => {
  try {
    await userApi.deleteUser(userId)
    await fetchUsers()
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.users-layout {
  padding: 1.5rem;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.75rem;
  }
}

.users-card {
  margin-bottom: 2rem;

  @include mobile {
    margin-bottom: 1.5rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-primary);

      @include mobile {
        font-size: 1.25rem;
      }

      @include xs-only {
        font-size: 1.125rem;
      }
    }

    .el-button {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;

      @include mobile {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
    }
  }

  .el-table {
    /* Адаптация таблицы для мобильных устройств */
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;

      @include mobile {
        width: 32px;
        height: 32px;
      }
    }

    .el-table__cell {
      padding: 10px 0;
    }

    .el-table__header-wrapper {
      .el-table__header {
        .el-table__cell {
          font-size: 0.9rem;
          color: var(--text-secondary);

          @include mobile {
            font-size: 0.8rem;
          }
        }
      }
    }

    .el-table__row {
      .el-table__cell {
        font-size: 0.875rem;

        @include mobile {
          font-size: 0.8rem;
        }

        .el-tag {
          font-size: 0.8rem;

          @include mobile {
            font-size: 0.7rem;
          }
        }

        .el-button-group {
          .el-button {
            padding: 5px 8px;
            font-size: 0.8rem;

            @include mobile {
              padding: 4px 6px;
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
}

.user-dialog {
  .el-dialog__header {
    .el-dialog__title {
      font-size: 1.5rem;

      @include mobile {
        font-size: 1.25rem;
      }
    }
  }

  .el-form-item {
    margin-bottom: 1.5rem;

    @include mobile {
      margin-bottom: 1rem;
    }

    .el-form-item__label {
      font-size: 0.9rem;

      @include mobile {
        font-size: 0.8rem;
      }
    }

    .el-input__inner,
    .el-select__inner {
      height: 40px;
      font-size: 0.875rem;

      @include mobile {
        height: 36px;
        font-size: 0.8rem;
      }
    }

    .el-switch__core {
      height: 20px;
      line-height: 20px;
      font-size: 0.875rem;

      @include mobile {
        height: 18px;
        line-height: 18px;
        font-size: 0.8rem;
      }
    }
  }

  .dialog-footer {
    .el-button {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;

      @include mobile {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
    }
  }
}

/* Адаптация для диалога подтверждения удаления */
.el-dialog.el-dialog--center {
  &.delete-dialog {
    width: 400px;

    @include mobile {
      width: 90%;
    }
  }

  .el-dialog__body {
    p {
      font-size: 1rem;

      @include mobile {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
