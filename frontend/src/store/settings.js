import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref({
        systemName: null,
        language: null,
        timezone: null,
        theme: null,
        primaryColor: null,
        notifications: {
            email: null,
            browser: null
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
        if (settings.value.theme) {
            document.documentElement.setAttribute('data-theme', settings.value.theme)
        }

        if (settings.value.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', settings.value.primaryColor)
        }

        if (settings.value.language) {
            document.documentElement.lang = settings.value.language
        }
    }

    const resetSettings = () => {
        const defaultSettings = {
            systemName: null,
            language: null,
            timezone: null,
            theme: null,
            primaryColor: null,
            notifications: {
                email: null,
                browser: null
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
