# Simple Dashboard

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4.15-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.11.1-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.7-yellow?style=flat-square&logo=vue.js&logoColor=white)](https://pinia.vuejs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.71.1-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)
[![ESLint](https://img.shields.io/badge/ESLint-8.56.0-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.2.5-F7B93E?style=flat-square&logo=prettier&logoColor=white)](https://prettier.io/)

## Требования

- Node.js >= 20.11.1
- npm >= 10.2.4

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/yourusername/simple-dashboard.git

# Переход в директорию проекта
cd simple-dashboard

# Установка зависимостей
npm install
```

## Разработка

```bash
# Запуск сервера разработки
npm run dev

# Проверка линтером
npm run lint

# Форматирование кода
npm run format
```

## Тестирование

```bash
# Запуск unit-тестов
npm run test:unit

# Запуск e2e-тестов
npm run test:e2e

# Проверка покрытия кода тестами
npm run test:coverage
```

## Сборка

```bash
# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Структура проекта

```
simple-dashboard/
├── src/
│   ├── assets/        # Статические ресурсы
│   ├── components/    # Vue компоненты
│   ├── router/        # Маршрутизация
│   ├── store/         # Pinia store
│   ├── views/         # Страницы
│   └── App.vue        # Корневой компонент
├── tests/             # Тесты
├── .env.example       # Пример переменных окружения
├── vite.config.js     # Конфигурация Vite
└── package.json       # Зависимости и скрипты
```

## Функциональность

- 🔐 Аутентификация пользователей
- 👥 Управление пользователями и группами
- ✅ Управление задачами
- 📊 Статистика и аналитика
- 🌓 Светлая и темная темы
- 📱 Адаптивный дизайн

## Технологии

- **Vue.js 3** - Прогрессивный JavaScript фреймворк
- **Vite** - Современный сборщик
- **Pinia** - Управление состоянием
- **Vue Router** - Маршрутизация
- **SCSS** - Препроцессор CSS
- **Font Awesome** - Иконки
- **ESLint & Prettier** - Линтинг и форматирование

## Тесты

Проект включает следующие тесты:

- **Unit тесты** - Тестирование компонентов и логики
- **E2E тесты** - Тестирование пользовательских сценариев
- **Интеграционные тесты** - Тестирование взаимодействия компонентов

## CI/CD

Проект использует GitHub Actions для:

- Проверки кода линтером
- Запуска тестов
- Сборки проекта
- Деплоя на production

## Лицензия

MIT
