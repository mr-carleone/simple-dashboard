<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <router-link to="/" class="home-link">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-light);
  padding: 2rem;

  @include mobile {
    padding: 1rem;
  }
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

h1 {
  font-size: 8rem;
  margin: 0;
  color: var(--danger-color);
  font-weight: bold;

  @include mobile {
    font-size: 5rem;
  }

  @include xs-only {
    font-size: 4rem;
  }
}

h2 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: var(--text-primary);

  @include mobile {
    font-size: 2rem;
    margin: 0.75rem 0;
  }

  @include xs-only {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
}

p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;

  @include mobile {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @include xs-only {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
}

.home-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  @include mobile {
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }

  @include xs-only {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>
