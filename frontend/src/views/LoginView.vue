<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Вход в систему</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Введите email" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button type="submit" class="login-button">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

// Получаем значения из .env
const ENV_LOGIN = import.meta.env.VITE_USER_LOGIN
const ENV_PASSWORD = import.meta.env.VITE_USER_PASSWORD

// Для отладки
console.log('ENV_LOGIN:', ENV_LOGIN)
console.log('ENV_PASSWORD:', ENV_PASSWORD)

function handleLogin() {
  console.log('Attempting login with:', {
    email: email.value,
    password: password.value
  })
  console.log('Comparing with:', { ENV_LOGIN, ENV_PASSWORD })

  if (email.value === ENV_LOGIN && password.value === ENV_PASSWORD) {
    localStorage.setItem('token', 'demo-token')
    router.push({ name: 'Home' })
  } else {
    error.value = 'Неверный логин или пароль'
  }
}
</script>

<style scoped>
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
}

.login-box {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
}

h1 {
  color: var(--text-primary);
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
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
  transition: background-color 0.2s;
}

.login-button:hover {
  background: var(--primary-dark);
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--error-color);
  color: white;
  border-radius: 6px;
  text-align: center;
}

@media (max-width: 480px) {
  .login-box {
    margin: 1rem;
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
