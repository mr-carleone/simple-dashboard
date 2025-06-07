<template>
  <div class="tasks-calendar">
    <div class="calendar-header">
      <div class="calendar-nav">
        <button class="btn-icon" @click="previousMonth">
          <i class="fas fa-chevron-left"></i>
        </button>
        <h2>{{ currentMonthYear }}</h2>
        <button class="btn-icon" @click="nextMonth">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="calendar-actions">
        <button
          class="btn"
          :class="{ 'btn-primary': view === 'month' }"
          @click="view = 'month'"
        >
          Месяц
        </button>
        <button
          class="btn"
          :class="{ 'btn-primary': view === 'week' }"
          @click="view = 'week'"
        >
          Неделя
        </button>
        <button
          class="btn"
          :class="{ 'btn-primary': view === 'day' }"
          @click="view = 'day'"
        >
          День
        </button>
      </div>
    </div>

    <div class="calendar-grid" v-if="view === 'month'">
      <div class="weekdays">
        <div v-for="day in weekDays" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>
      <div class="days">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="day-cell"
          :class="{
            'other-month': !day.currentMonth,
            'today': day.isToday,
            'has-tasks': getTasksForDay(day.date).length > 0
          }"
        >
          <div class="day-header">
            <span class="day-number">{{ day.dayNumber }}</span>
            <span class="task-count" v-if="getTasksForDay(day.date).length">
              {{ getTasksForDay(day.date).length }}
            </span>
          </div>
          <div class="day-tasks">
            <div
              v-for="task in getTasksForDay(day.date)"
              :key="task.id"
              class="task-item"
              :class="task.priority"
              @click="showTaskDetails(task)"
            >
              <span class="task-time">{{ task.time }}</span>
              <span class="task-title">{{ task.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="week-view" v-else-if="view === 'week'">
      <div class="week-header">
        <div class="time-column"></div>
        <div
          v-for="day in weekDays"
          :key="day"
          class="day-column"
        >
          {{ day }}
        </div>
      </div>
      <div class="week-grid">
        <div class="time-slots">
          <div
            v-for="hour in hours"
            :key="hour"
            class="time-slot"
          >
            {{ formatHour(hour) }}
          </div>
        </div>
        <div class="week-days">
          <div
            v-for="(day, dayIndex) in weekDays"
            :key="day"
            class="day-column"
          >
            <div
              v-for="hour in hours"
              :key="hour"
              class="time-slot"
            >
              <div
                v-for="task in getTasksForTimeSlot(dayIndex, hour)"
                :key="task.id"
                class="task-item"
                :class="task.priority"
                :style="getTaskStyle(task)"
                @click="showTaskDetails(task)"
              >
                <span class="task-time">{{ task.time }}</span>
                <span class="task-title">{{ task.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="day-view" v-else>
      <div class="day-header">
        <h3>{{ formatDate(currentDate) }}</h3>
      </div>
      <div class="day-timeline">
        <div
          v-for="hour in hours"
          :key="hour"
          class="time-slot"
        >
          <div class="time-label">{{ formatHour(hour) }}</div>
          <div class="time-content">
            <div
              v-for="task in getTasksForHour(hour)"
              :key="task.id"
              class="task-item"
              :class="task.priority"
              @click="showTaskDetails(task)"
            >
              <span class="task-time">{{ task.time }}</span>
              <span class="task-title">{{ task.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksCalendar',
  data() {
    return {
      view: 'month',
      currentDate: new Date(),
      weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      hours: Array.from({ length: 24 }, (_, i) => i),
      tasks: [
        {
          id: 1,
          title: 'Встреча с командой',
          description: 'Ежедневная встреча для обсуждения прогресса',
          date: '2024-03-15',
          time: '10:00',
          duration: 60,
          priority: 'high',
          status: 'todo'
        },
        {
          id: 2,
          title: 'Код ревью',
          description: 'Проверка кода нового функционала',
          date: '2024-03-15',
          time: '14:00',
          duration: 120,
          priority: 'medium',
          status: 'in-progress'
        },
        {
          id: 3,
          title: 'Дедлайн проекта',
          description: 'Сдача первой версии проекта',
          date: '2024-03-20',
          time: '18:00',
          duration: 60,
          priority: 'high',
          status: 'todo'
        }
      ]
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric'
      })
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const days = []

      // Добавляем дни предыдущего месяца
      const firstDayOfWeek = firstDay.getDay() || 7
      for (let i = firstDayOfWeek - 1; i > 0; i--) {
        const date = new Date(year, month, 1 - i)
        days.push({
          date: date.toISOString().split('T')[0],
          dayNumber: date.getDate(),
          currentMonth: false,
          isToday: this.isToday(date)
        })
      }

      // Добавляем дни текущего месяца
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i)
        days.push({
          date: date.toISOString().split('T')[0],
          dayNumber: i,
          currentMonth: true,
          isToday: this.isToday(date)
        })
      }

      // Добавляем дни следующего месяца
      const lastDayOfWeek = lastDay.getDay() || 7
      for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
        const date = new Date(year, month + 1, i)
        days.push({
          date: date.toISOString().split('T')[0],
          dayNumber: date.getDate(),
          currentMonth: false,
          isToday: this.isToday(date)
        })
      }

      return days
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      )
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      )
    },
    isToday(date) {
      const today = new Date()
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear()
    },
    formatDate(date) {
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    formatHour(hour) {
      return `${hour.toString().padStart(2, '0')}:00`
    },
    getTasksForDay(date) {
      return this.tasks.filter(task => task.date === date)
    },
    getTasksForTimeSlot(dayIndex, hour) {
      const date = new Date(this.currentDate)
      date.setDate(date.getDate() - date.getDay() + dayIndex + 1)
      const dateString = date.toISOString().split('T')[0]

      return this.tasks.filter(task => {
        const taskHour = parseInt(task.time.split(':')[0])
        return task.date === dateString && taskHour === hour
      })
    },
    getTasksForHour(hour) {
      const dateString = this.currentDate.toISOString().split('T')[0]

      return this.tasks.filter(task => {
        const taskHour = parseInt(task.time.split(':')[0])
        return task.date === dateString && taskHour === hour
      })
    },
    getTaskStyle(task) {
      const startHour = parseInt(task.time.split(':')[0])
      const duration = task.duration / 60 // в часах
      return {
        top: `${startHour * 60}px`,
        height: `${duration * 60}px`
      }
    },
    showTaskDetails(task) {
      console.log('Показать детали задачи:', task)
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-calendar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  .calendar-nav {
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
      margin: 0;
      min-width: 200px;
      text-align: center;
      color: var(--heading-color);
    }
  }

  .calendar-actions {
    display: flex;
    gap: 0.5rem;
  }
}

.calendar-grid {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);

    .weekday {
      padding: 1rem;
      text-align: center;
      font-weight: 500;
      color: var(--text-secondary);
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(120px, 1fr);
  }

  .day-cell {
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 0.5rem;
    min-height: 120px;

    &:nth-child(7n) {
      border-right: none;
    }

    &.other-month {
      background: var(--bg-tertiary);
      color: var(--text-tertiary);
    }

    &.today {
      background: var(--primary-color-light);
    }

    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;

      .day-number {
        font-weight: 500;
      }

      .task-count {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        font-size: 0.75rem;
      }
    }

    .day-tasks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}

.week-view {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  .week-header {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);

    .day-column {
      padding: 1rem;
      text-align: center;
      font-weight: 500;
      color: var(--text-secondary);
    }
  }

  .week-grid {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    height: calc(24 * 60px);
    position: relative;
  }

  .time-slots {
    border-right: 1px solid var(--border-color);

    .time-slot {
      height: 60px;
      padding: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-color);
    }
  }

  .week-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .day-column {
      border-right: 1px solid var(--border-color);

      &:last-child {
        border-right: none;
      }

      .time-slot {
        height: 60px;
        border-bottom: 1px solid var(--border-color);
        position: relative;
      }
    }
  }
}

.day-view {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);

  .day-header {
    padding: 1rem;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);

    h3 {
      margin: 0;
      color: var(--heading-color);
    }
  }

  .day-timeline {
    .time-slot {
      display: grid;
      grid-template-columns: 60px 1fr;
      border-bottom: 1px solid var(--border-color);

      .time-label {
        padding: 0.5rem;
        font-size: 0.75rem;
        color: var(--text-secondary);
        border-right: 1px solid var(--border-color);
      }

      .time-content {
        padding: 0.5rem;
        position: relative;
      }
    }
  }
}

.task-item {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }

  &.high {
    background: var(--danger-color);
  }

  &.medium {
    background: var(--warning-color);
  }

  &.low {
    background: var(--success-color);
  }

  .task-time {
    display: block;
    font-size: 0.75rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
  }

  .task-title {
    display: block;
    font-weight: 500;
  }
}

.btn-icon {
  padding: 0.5rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: all var(--transition-normal);

  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-color);
  }
}
</style>
