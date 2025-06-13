// src/store/index.js
import { defineStore } from 'pinia'
import api from '@/api/config'

export const useMainStore = defineStore('main', {
  state: () => ({
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCurrentUser() {
      if (!localStorage.getItem('token')) {
        this.isAuthenticated = false
        this.currentUser = null
        return
      }

      if (this.loading) {
        return
      }

      this.loading = true
      this.error = null
      try {
        const response = await api.get('/users/me')
        this.currentUser = response.data
        this.isAuthenticated = true
      } catch (error) {
        console.error('Ошибка получения текущего пользователя:', error)
        this.error = error.response?.data?.detail || 'Ошибка получения данных пользователя'
        this.isAuthenticated = false
        this.currentUser = null
        localStorage.removeItem('token')
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.currentUser = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})
