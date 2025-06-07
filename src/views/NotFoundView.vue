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

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #e74c3c;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

.home-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>
