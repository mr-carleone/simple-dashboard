# Dashboard Template

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%2320232a.svg?style=for-the-badge&logo=pinia&logoColor=ffd859)
![Vue Router](https://img.shields.io/badge/Vue_Router-%2342b883.svg?style=for-the-badge&logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![ES6](https://img.shields.io/badge/ES6-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

Базовый стартовый шаблон для dashboard приложения с современным стеком технологий.

## Особенности

- ⚡️ **Vite** - мгновенная перезагрузка
- 🏓 **Vue 3** с Composition API
- 🍖 **Pinia** для управления состоянием
- 🧭 **Vue Router** для навигации
- 🗃️ **ES6 Modules**
- 🛢️ **Node.js** для серверной части

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 2. Запуск dev-сервера

```bash
npm run dev
# или
yarn dev
```

### 3. Сборка для production

```bash
npm run build
# или
yarn build
```

### 4. Превью production сборки

```bash
npm run preview
# или
yarn preview
```

### Структура проекта

```
src/
├── assets/           # Статические ресурсы
│   └── scss/         # SCSS style
├── components/       # UI компоненты
├── layouts/          # Шаблоны приложения
├── router/           # Конфигурация роутера
│   └── index.js
├── stores/           # Pinia хранилища
│   └── index.js
├── views/            # Страницы приложения
├── App.vue           # Корневой компонент
└── main.js           # Точка входа
```

### Конфигурация

#### Настройка окружения

Создайте файл `.env` в корне проекта

```
VITE_API_BASE_URL=http://api.example.com
VITE_APP_NAME=MyDashboard
```

### Основные зависимости

```json
"dependencies": {
  "vue": "^3.5.13",
  "vue-router": "^4.5.1",
  "pinia": "^3.0.3"
},
"devDependencies": {
  "vite": "^6.3.5",
  "@vitejs/plugin-vue": "^5.2.3"
}
```

### Скриншот

![Alt text](/screenshot/screen.png?raw=true "Dashboard Home")
