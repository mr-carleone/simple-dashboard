<template>
  <div class="users-layout">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>Пользователи</h2>
          <el-button type="primary" @click="handleAddUser">
            <font-awesome-icon :icon="['fas', 'user-plus']" /> Добавить пользователя
          </el-button>
        </div>
      </template>

      <el-table :data="users" style="width: 100%" v-loading="loading">
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
    </el-card>

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
import { usersApi } from '@/api/users'

export default {
  name: 'UsersLayout',
  data() {
    return {
      loading: false,
      users: [],
      showUserDialog: false,
      isEditing: false,
      userForm: {
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
      }
    }
  },
  methods: {
    async loadUsers() {
      try {
        this.loading = true
        this.users = await usersApi.getUsers()
      } catch (error) {
        this.$message.error('Ошибка при загрузке пользователей')
        console.error('Error loading users:', error)
      } finally {
        this.loading = false
      }
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
    handleAddUser() {
      this.isEditing = false
      this.userForm = {
        fullName: '',
        email: '',
        position: '',
        role: ''
      }
      this.showUserDialog = true
    },
    handleEditUser(user) {
      this.isEditing = true
      this.userForm = { ...user }
      this.showUserDialog = true
    },
    async handleDeleteUser(user) {
      try {
        await this.$confirm('Вы уверены, что хотите удалить этого пользователя?', 'Предупреждение', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          type: 'warning'
        })

        await usersApi.deleteUser(user.id)
        await this.loadUsers()

        this.$message({
          type: 'success',
          message: 'Пользователь успешно удален'
        })
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('Ошибка при удалении пользователя')
          console.error('Error deleting user:', error)
        }
      }
    },
    async saveUser() {
      try {
        await this.$refs.userFormRef.validate()

        if (this.isEditing) {
          await usersApi.updateUser(this.userForm.id, this.userForm)
        } else {
          await usersApi.createUser(this.userForm)
        }

        await this.loadUsers()
        this.showUserDialog = false

        this.$message({
          type: 'success',
          message: this.isEditing ? 'Пользователь успешно обновлен' : 'Пользователь успешно добавлен'
        })
      } catch (error) {
        this.$message.error('Ошибка при сохранении пользователя')
        console.error('Error saving user:', error)
      }
    }
  },
  async created() {
    await this.loadUsers()
  }
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: var(--el-text-color-primary);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
