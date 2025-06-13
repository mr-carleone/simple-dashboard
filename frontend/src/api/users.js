import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1'

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, {
            email: userData.email,
            username: userData.username,
            password: userData.password,
            is_active: true
        })
        return response.data
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message)
        throw error
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/`)
        return response.data
    } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message)
        throw error
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData)
        return response.data
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message)
        throw error
    }
}

export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/users/${userId}`)
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message)
        throw error
    }
}
