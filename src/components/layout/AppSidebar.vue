<template>
  <nav
    class="sidebar"
    :class="{ 'sidebar--collapsed': mainStore.isSidebarCollapsed }"
  >
    <div class="sidebar__menu">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :class="{
          'menu-item--has-children': item.children,
          'menu-item--active': isActive(item),
        }"
      >
        <!-- Изменено: раздельная обработка для пунктов с детьми и без -->
        <div
          class="menu-item__header"
          @click="handleItemClick(index, item, $event)"
        >
          <span class="menu-item__title">
            <font-awesome-icon
              v-if="item.icon"
              :icon="item.icon"
              class="menu-item__icon"
              fixed-width
            />
            <span
              v-show="!mainStore.isSidebarCollapsed"
              class="menu-item__text"
              >{{ item.title }}</span
            >
          </span>
          <font-awesome-icon
            v-if="item.children && !mainStore.isSidebarCollapsed"
            :icon="item.isOpen ? 'chevron-up' : 'chevron-down'"
            class="menu-item__arrow"
          />
        </div>

        <transition name="slide">
          <div v-show="item.isOpen && item.children" class="menu-item__submenu">
            <router-link
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              v-slot="{ isActive }"
              :to="subItem.path"
              class="submenu-item"
              :class="{ 'submenu-item--active': isActive }"
              @click="closeOtherSubmenus(index)"
            >
              <font-awesome-icon
                v-if="subItem.icon"
                :icon="subItem.icon"
                class="submenu-item__icon"
                fixed-width
              />
              <span class="submenu-item__text">{{ subItem.title }}</span>
            </router-link>
          </div>
        </transition>
      </div>
    </div>

    <div class="sidebar__toggle">
      <el-button circle size="small" @click="mainStore.toggleSidebar">
        <font-awesome-icon
          :icon="mainStore.toggleSidebar ? 'chevron-right' : 'chevron-left'"
        />
      </el-button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/store/index";

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();

const menuItems = ref([
  {
    title: "Главная",
    path: "/",
    icon: "home",
  },
  {
    title: "Пользователи",
    icon: "users",
    isOpen: false,
    children: [
      {
        title: "Список",
        path: "/users",
        icon: "list",
      },
      {
        title: "Группы",
        path: "/groups",
        icon: "folder",
      },
    ],
  },
  {
    title: "Настройки",
    icon: "cog",
    isOpen: false,
    children: [
      {
        title: "Системные",
        path: "/settings/system",
      },
      {
        title: "Профиль",
        path: "/settings/profile",
      },
    ],
  },
  {
    title: "О приложении",
    path: "/about",
    icon: "info-circle",
  },
  {
    title: "Профиль",
    path: "/profile",
    icon: "user",
  },
]);

// Автоматическое закрытие подменю при изменении маршрута
watch(route, () => {
  menuItems.value.forEach((item) => {
    if (item.children) {
      item.isOpen = false;
    }
  });
});

const isActive = (item) => {
  if (item.path) {
    return route.path === item.path;
  }

  if (item.children) {
    return item.children.some((child) => route.path.startsWith(child.path));
  }

  return false;
};

const handleItemClick = (index, item, event) => {
  const menuItem = menuItems.value[index];

  if (mainStore.isSidebarCollapsed && item.children) {
    mainStore.expandSidebar();
    menuItem.isOpen = true;
    closeOtherSubmenus(index);
    return;
  }

  if (item.children) {
    menuItem.isOpen = !menuItem.isOpen;
    if (menuItem.isOpen) {
      closeOtherSubmenus(index);
    }
  } else {
    router.push(item.path);
  }
};

// Закрытие других подменю при открытии текущего
const closeOtherSubmenus = (currentIndex) => {
  menuItems.value.forEach((item, index) => {
    if (index !== currentIndex && item.children) {
      item.isOpen = false;
    }
  });
};

// Адаптация высоты под экран
onMounted(() => {
  const updateHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  updateHeight();
  window.addEventListener("resize", updateHeight);
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;
@use "sass:color";

:root {
  --vh: 1vh; /* Базовое значение для адаптивной высоты */
}

.sidebar {
  width: $sidebar-width;
  background-color: $primary;
  color: $text-light;
  height: calc(var(--vh, 1vh) * 95); /* Используем CSS-переменную */
  padding: 20px 0;
  transition: width $transition-duration;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Добавлено для корректного отображения поверх других элементов */
  overflow-y: auto; /* Прокрутка только если контент не помещается */

  &--collapsed {
    width: 60px;

    .menu-item__text,
    .submenu-item__text,
    .menu-item__arrow {
      display: none;
    }

    .menu-item__header {
      justify-content: center;
      padding: 12px 0; /* Уменьшаем боковые отступы */
    }

    .menu-item__icon {
      font-size: 18px; /* Увеличиваем иконки в свернутом состоянии */
      margin: 0; /* Убираем отступы */
    }
  }

  &__menu {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px;
  }

  &__toggle {
    display: flex;
    justify-content: center;
    padding: 15px 0 5px;
    border-top: 1px solid color.adjust($text-light, $alpha: -0.8);

    .el-button {
      background-color: $accent;
      color: white;
      border: none;
      transition: transform 0.3s ease; /* Анимация для кнопки */

      &:hover {
        transform: scale(1.1); /* Изменение масштаба при наведении */
      }
    }
  }
}

.menu-item {
  border-radius: 8px;
  margin-bottom: 5px;
  transition: background-color $transition-duration;
  overflow: hidden;
  cursor: pointer;
  position: relative; // Добавлено для позиционирования подменю

  &--has-children {
    .menu-item__header {
      cursor: pointer;
    }
  }

  &--active {
    background-color: rgba($accent, 0.2);

    .menu-item__header {
      font-weight: 600;
    }
  }

  /* Увеличиваем область нажатия для иконок */
  &__header {
    padding: 12px 15px; /* Увеличиваем отступы для большей кликабельной области */
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      background: rgba(white, 0.1);
      border-radius: 8px;
    }
  }

  /* Исправление для выравнивания иконок */
  &__title {
    display: flex;
    align-items: center;
    gap: 12px; /* Расстояние между иконкой и текстом */
    overflow: hidden;
  }

  &__icon {
    font-size: 16px;
    width: 24px;
    text-align: center;
    transition: transform 0.3s ease;
    flex-shrink: 0; /* Предотвращаем сжатие иконок */
  }

  &__arrow {
    font-size: 12px;
    opacity: 0.7;
    transition: transform 0.3s ease;
    flex-shrink: 0; /* Предотвращаем сжатие иконок */
  }

  &__submenu {
    background: color.adjust($primary, $lightness: -5%);
    overflow: hidden;
    border-radius: 0 0 8px 8px;
    margin-top: -5px;
    padding: 5px 0 10px;
  }
}

/* Уменьшаем отступы для подменю */
.submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 40px; /* Уменьшен левый отступ с 50px до 40px */
  color: $text-light;
  text-decoration: none;
  transition: background $transition-duration;
  gap: 12px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  font-size: 14px;

  &:hover {
    background: rgba(white, 0.08);
  }

  &--active {
    background: $accent;
    font-weight: 500;

    &:hover {
      background: color.adjust($accent, $lightness: 10%);
    }

    /* Сдвигаем индикатор активного пункта ближе к краю */
    &::before {
      content: "";
      position: absolute;
      left: 20px; /* Сдвигаем ближе к краю (было 25px) */
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: white;
      border-radius: 2px;
    }
  }

  &__icon {
    font-size: 14px;
    width: 20px;
    text-align: center;
    opacity: 0.9;
    flex-shrink: 0; /* Предотвращаем сжатие иконок */
  }
}

// Анимации
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Адаптация для мобильных устройств */
@media (max-height: 600px) {
  .sidebar {
    padding: 10px 0;

    .menu-item__header {
      padding: 8px 10px;
    }

    .submenu-item {
      padding: 6px 10px 6px 35px;
    }
  }
}
</style>
