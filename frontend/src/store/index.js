// src/store/index.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useMainStore = defineStore('main', () => {
  const router = useRouter()

  const appName = ref(import.meta.env.VITE_APP_NAME || 'Vue3 App')
  const isSidebarCollapsed = ref(false)
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const updateAppName = (newName) => {
    appName.value = newName
  }
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  const collapseSidebar = () => {
    isSidebarCollapsed.value = true
  }
  const expandSidebar = () => {
    isSidebarCollapsed.value = false
  }
  const fetchCurrentUser = async () => {
    loading.value = true
    error.value = null
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found.')
      }

      // Специальная обработка для admin-token (для разработки/отладки)
      if (token === 'admin-token') {
        user.value = {
          email: import.meta.env.VITE_USER_LOGIN,
          username: 'Локальный Администратор',
          role: 'admin',
          is_active: true,
        }
        console.log("Вход выполнен как локальный администратор.")
        return // Выходим после установки локального пользователя
      }

      // Продолжаем с запросом API для настоящих JWT токенов
      const response = await axios.get('/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      user.value = response.data
    } catch (err) {
      console.error('Ошибка получения текущего пользователя:', err)
      error.value = err.response?.data?.detail || 'Не удалось получить пользователя'
      user.value = null
      localStorage.removeItem('token')
    } finally {
      loading.value = false
    }
  }
  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    appName,
    isSidebarCollapsed,
    user,
    loading,
    error,
    updateAppName,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    fetchCurrentUser,
    logout
  }
})
