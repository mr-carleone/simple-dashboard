<template>
    <div class="factory-details">
        <el-card v-if="factory">
            <template #header>
                <div class="card-header">
                    <h2>{{ factory.fullName }} ({{ factory.name }})</h2>
                    <el-button-group>
                        <el-button type="primary" @click="handleEdit">
                            <font-awesome-icon :icon="['fas', 'edit']" /> Редактировать
                        </el-button>
                        <el-button type="danger" @click="handleDelete">
                            <font-awesome-icon :icon="['fas', 'trash']" /> Удалить
                        </el-button>
                    </el-button-group>
                </div>
            </template>

            <el-descriptions :column="2" border>
                <el-descriptions-item label="Название завода">{{ factory.fullName }}</el-descriptions-item>
                <el-descriptions-item label="Код завода">{{ factory.name }}</el-descriptions-item>
                <el-descriptions-item label="Статус">
                    <el-tag :type="factory.status === 'active' ? 'success' : 'warning'">
                        {{ factory.status === 'active' ? 'Активен' : 'Неактивен' }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Количество заявок">{{ factory.requests }}</el-descriptions-item>
            </el-descriptions>

            <div class="requests-section">
                <h3>Заявки на автотранспорт</h3>
                <el-table :data="factoryRequests" style="width: 100%">
                    <el-table-column prop="id" label="№" width="80" />
                    <el-table-column prop="date" label="Дата заявки" width="150" />
                    <el-table-column prop="type" label="Тип транспорта" />
                    <el-table-column prop="purpose" label="Цель" />
                    <el-table-column prop="status" label="Статус">
                        <template #default="{ row }">
                            <el-tag :type="getStatusType(row.status)">
                                {{ row.status }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Действия" width="120">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="handleViewRequest(row)">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'FactoryDetails',
    data() {
        return {
            factory: {
                id: 1,
                name: 'PMP',
                fullName: 'Промпроект',
                status: 'active',
                requests: 15
            },
            factoryRequests: [
                {
                    id: 1,
                    date: '2024-03-20',
                    type: 'Грузовой',
                    purpose: 'Доставка материалов',
                    status: 'В обработке'
                },
                {
                    id: 2,
                    date: '2024-03-19',
                    type: 'Пассажирский',
                    purpose: 'Трансфер сотрудников',
                    status: 'Выполнено'
                },
                {
                    id: 3,
                    date: '2024-03-18',
                    type: 'Грузовой',
                    purpose: 'Вывоз продукции',
                    status: 'Отменено'
                }
            ],
        }
    },
    methods: {
        getStatusType(status) {
            const types = {
                'В обработке': 'warning',
                'Выполнено': 'success',
                'Отменено': 'danger'
            }
            return types[status] || 'info'
        },
        handleViewRequest(request) {
            console.log('View request:', request)
        },
        handleEdit() {
            this.$router.push(`/sova/factories/${this.factory.id}/edit`)
        },
        handleDelete() {
            this.$confirm('Вы уверены, что хотите удалить этот завод?', 'Предупреждение', {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }).then(() => {
                this.$router.push('/sova/factories')
            })
        }
    },
    created() {
        // this.fetchFactoryDetails(); // Если был метод загрузки деталей завода, он останется
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.factory-details {
  padding: 1.5rem;

  @include mobile {
    padding: 1rem;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.25rem;
    }

    @include xs-only {
      font-size: 1.125rem;
    }
  }

  .el-button-group {
    @include mobile {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    .el-button {
      padding: 0.6rem 1rem;

      @include mobile {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
    }
  }
}

.el-descriptions {
  margin-bottom: 2rem;

  @include mobile {
    margin-bottom: 1.5rem;
  }

  :deep(.el-descriptions__cell) {
    font-size: 0.9rem;

    @include mobile {
      font-size: 0.85rem;
      display: block; /* Отображать каждый item как блок на мобильных */
      width: 100% !important; /* Полная ширина для каждого item */
      padding-bottom: 5px; /* Отступ между элементами */
      padding-top: 5px;
    }

    .el-descriptions__label {
      font-weight: 600;
      color: var(--text-secondary);

      @include mobile {
        margin-bottom: 2px;
      }
    }

    .el-descriptions__content {
      color: var(--text-primary);
    }

    .el-tag {
      font-size: 0.8rem;

      @include mobile {
        font-size: 0.7rem;
      }
    }
  }
}

.requests-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);

  @include mobile {
    margin-top: 1rem;
    padding-top: 1rem;
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.125rem;
      margin-bottom: 0.75rem;
    }

    @include xs-only {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }
}

.el-table {
  margin-top: 1rem;

  .el-table__cell {
    padding: 10px 0;
  }

  .el-table__header-wrapper {
    .el-table__header {
      .el-table__cell {
        font-size: 0.9rem;
        color: var(--text-secondary);

        @include mobile {
          font-size: 0.8rem;
        }
      }
    }
  }

  .el-table__row {
    .el-table__cell {
      font-size: 0.875rem;

      @include mobile {
        font-size: 0.8rem;
      }

      .el-tag {
        font-size: 0.8rem;

        @include mobile {
          font-size: 0.7rem;
        }
      }

      .el-button {
        padding: 5px 8px;
        font-size: 0.8rem;

        @include mobile {
          padding: 4px 6px;
          font-size: 0.75rem;
        }
      }
    }
  }
}

</style>
