import axios from 'axios'
import router from '@/router'

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Добавляем интерсептор для добавления токена к запросам
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Добавляем интерсептор для обработки ответов
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Если токен истек или недействителен, удаляем его
            localStorage.removeItem('token')
            // Перенаправляем на страницу входа только если мы не на ней
            if (router.currentRoute.value.name !== 'Login') {
                router.push({ name: 'Login' })
            }
        }
        return Promise.reject(error)
    }
)

export default api
