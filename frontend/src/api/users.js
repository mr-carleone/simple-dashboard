import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const usersApi = {
    // Получить список всех пользователей
    async getUsers() {
        const response = await axios.get(`${API_URL}/users/`)
        return response.data
    },

    // Получить пользователя по ID
    async getUserById(id) {
        const response = await axios.get(`${API_URL}/users/${id}`)
        return response.data
    },

    // Создать нового пользователя
    async createUser(userData) {
        const response = await axios.post(`${API_URL}/users/`, userData)
        return response.data
    },

    // Обновить пользователя
    async updateUser(userId, userData) {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData)
        return response.data
    },

    // Удалить пользователя
    async deleteUser(userId) {
        const response = await axios.delete(`${API_URL}/users/${userId}`)
        return response.data
    }
}
