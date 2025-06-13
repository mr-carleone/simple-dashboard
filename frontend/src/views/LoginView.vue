<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Вход в систему</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            placeholder="Введите email"
            required
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            placeholder="Введите пароль"
            required
            autocomplete="current-password"
          />
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import api from '@/api/config'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const mainStore = useMainStore()

async function handleLogin() {
  error.value = ''
  loading.value = true

  if (!email.value || !password.value) {
    error.value = 'Пожалуйста, введите email и пароль.'
    return
  }

  try {
    const response = await api.post('/auth/login', {
      email: email.value.trim(),
      password: password.value.trim(),
    })

    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token)
      await mainStore.fetchCurrentUser()

      if (mainStore.isAuthenticated) {
        router.push({ name: 'Home' })
      } else {
        error.value = 'Ошибка аутентификации. Пожалуйста, попробуйте снова.'
      }
    } else {
      error.value = 'Неверный логин или пароль.'
    }
  } catch (err) {
    console.error('Ошибка входа:', err)
    let errorMessage = 'Произошла ошибка при попытке входа.'
    if (err.response && err.response.data && err.response.data.detail) {
      errorMessage = err.response.data.detail
    } else if (err.message) {
      errorMessage = err.message
    }
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  overflow: hidden;

  @include mobile {
    padding: 1rem;
  }

  @include xs-only {
    padding: 0.5rem;
  }
}

.login-box {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;

  @include mobile {
    padding: 2rem;
    margin: 0.75rem;
  }

  @include xs-only {
    padding: 1.5rem;
    margin: 0.5rem;
  }
}

h1 {
  color: var(--text-primary);
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;

  @include mobile {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @include xs-only {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
}

.form-group {
  margin-bottom: 1.5rem;

  @include mobile {
    margin-bottom: 1rem;
  }
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;

  @include mobile {
    font-size: 0.8rem;
  }
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: var(--card-bg);
  color: var(--text-primary);

  @include mobile {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  @include xs-only {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @include mobile {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @include xs-only {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
}

.login-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--error-color);
  color: white;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;

  @include mobile {
    margin-top: 0.75rem;
    padding: 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
