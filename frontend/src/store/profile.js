import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useMainStore } from './index'

export const useProfileStore = defineStore('profile', () => {
    const mainStore = useMainStore()
    const profile = ref({
        avatar: localStorage.getItem('temp_avatar') || null,
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        bio: ''
    })
    // console.log('Profile store initialized. Initial avatar:', profile.value.avatar)

    const loadProfile = async () => {
        // console.log('loadProfile called. Avatar before update:', profile.value.avatar)
        if (mainStore.user) {
            profile.value = {
                ...profile.value,
                name: mainStore.user.name || '',
                email: mainStore.user.email || '',
                phone: mainStore.user.phone || '',
                company: mainStore.user.company || '',
                position: mainStore.user.position || '',
                bio: mainStore.user.bio || ''
            }
        }
        // console.log('loadProfile finished. Avatar after update:', profile.value.avatar)
    }

    const saveProfile = async () => {
        // TODO: Реализовать сохранение профиля на сервере
        return true
    }

    const updateAvatar = async (avatarData) => {
        try {
            // Временно сохраняем в localStorage
            localStorage.setItem('temp_avatar', avatarData)
            profile.value.avatar = avatarData
            // console.log('Avatar updated in store and localStorage:', profile.value.avatar)
            return true
        } catch (error) {
            console.error('Ошибка при обновлении аватара:', error)
            return false
        }
    }

    const removeAvatar = async () => {
        try {
            // Временно удаляем из localStorage
            localStorage.removeItem('temp_avatar')
            profile.value.avatar = null
            // console.log('Avatar removed from store and localStorage:', profile.value.avatar)
            return true
        } catch (error) {
            console.error('Ошибка при удалении аватара:', error)
            return false
        }
    }

    const updatePassword = async (currentPassword, newPassword) => {
        // TODO: Реализовать API запрос для смены пароля на сервере
        console.log('Updating password...')
        console.log('Current Password:', currentPassword)
        console.log('New Password:', newPassword)

        // Заглушка: всегда успешно
        return true
    }

    return {
        profile,
        loadProfile,
        saveProfile,
        updateAvatar,
        removeAvatar,
        updatePassword
    }
})
