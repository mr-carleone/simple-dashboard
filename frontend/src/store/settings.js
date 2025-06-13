import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref({
        systemName: 'Dashboard',
        language: 'ru',
        timezone: 'UTC+3',
        theme: 'light',
        primaryColor: '#3498db',
        notifications: {
            email: true,
            browser: false
        }
    })

    const loadSettings = async () => {
        try {
            const savedSettings = localStorage.getItem('appSettings')
            if (savedSettings) {
                settings.value = JSON.parse(savedSettings)
            }
        } catch (error) {
            console.error('Ошибка при загрузке настроек:', error)
        }
    }

    const saveSettings = async (newSettings) => {
        try {
            settings.value = { ...settings.value, ...newSettings }
            localStorage.setItem('appSettings', JSON.stringify(settings.value))
            applySettings()
            return true
        } catch (error) {
            console.error('Ошибка при сохранении настроек:', error)
            return false
        }
    }

    const applySettings = () => {
        // Применяем тему
        document.documentElement.setAttribute('data-theme', settings.value.theme)

        // Применяем основной цвет
        document.documentElement.style.setProperty('--primary-color', settings.value.primaryColor)

        // Применяем язык
        document.documentElement.lang = settings.value.language
    }

    const resetSettings = () => {
        const defaultSettings = {
            systemName: 'Dashboard',
            language: 'ru',
            timezone: 'UTC+3',
            theme: 'light',
            primaryColor: '#3498db',
            notifications: {
                email: true,
                browser: false
            }
        }
        saveSettings(defaultSettings)
    }

    return {
        settings,
        loadSettings,
        saveSettings,
        applySettings,
        resetSettings
    }
})
