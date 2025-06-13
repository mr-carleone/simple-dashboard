import api from './config'

export const userApi = {
    getCurrentUser: () => api.get('/users/me'),
    updateUser: (userId, data) => api.put(`/users/${userId}`, data),
    deleteUser: (userId) => api.delete(`/users/${userId}`),
    getAllUsers: () => api.get('/users'),
    createUser: (data) => api.post('/users', data)
}
