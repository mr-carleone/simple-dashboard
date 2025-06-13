<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <p>Извините, запрашиваемая страница не существует.</p>
    <router-link to="/" class="home-link">Вернуться на главную</router-link>
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
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;

  @include mobile {
    padding: 1.5rem;
  }

  @include xs-only {
    padding: 1rem;
  }
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: var(--danger-color);

  @include mobile {
    font-size: 4rem;
  }

  @include xs-only {
    font-size: 3rem;
  }
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--text-primary);

  @include mobile {
    font-size: 1.5rem;
    margin: 0.75rem 0;
  }

  @include xs-only {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
}

p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;

  @include mobile {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  @include xs-only {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
}

.home-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  @include mobile {
    margin-top: 1.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @include xs-only {
    margin-top: 1rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}

.home-link:hover {
  background-color: var(--primary-dark);
}
</style>
