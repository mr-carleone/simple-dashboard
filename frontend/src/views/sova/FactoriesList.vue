<template>
    <div class="factories-list">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>Заводы</span>
                        </div>
                    </template>

                    <el-table :data="factories" style="width: 100%" @row-click="handleRowClick">
                        <el-table-column prop="name" label="Название завода" />
                        <el-table-column prop="fullName" label="Полное название" />
                        <el-table-column prop="requests" label="Количество заявок" />
                        <el-table-column prop="status" label="Статус">
                            <template #default="{ row }">
                                <el-tag :type="row.status === 'active' ? 'success' : 'warning'">
                                    {{ row.status === 'active' ? 'Активен' : 'Неактивен' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Действия" width="120">
                            <template #default="{ row }">
                                <el-button type="primary" @click.stop="handleViewFactory(row)">
                                    <font-awesome-icon :icon="['fas', 'eye']" />
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'FactoriesList',
    data() {
        return {
            selectedFactory: null,
            factories: [
                {
                    id: 1,
                    name: 'PMP',
                    fullName: 'Промпроект',
                    status: 'active',
                    requests: 15
                },
                {
                    id: 2,
                    name: 'KAV',
                    fullName: 'Кавказ Цемент',
                    status: 'active',
                    requests: 8
                },
                {
                    id: 3,
                    name: 'MIH',
                    fullName: 'Михайлов Цемент',
                    status: 'active',
                    requests: 12
                }
            ]
        }
    },
    methods: {
        handleViewFactory(factory) {
            this.$router.push(`/sova/factories/${factory.id}`)
        },
        handleRowClick(row) {
            this.selectedFactory = row
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as *;
@use '@/assets/scss/variables' as *;

.factories-list {
  margin-top: 1.5rem;

  @include mobile {
    margin-top: 1rem;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.5rem;
    color: var(--text-primary);

    @include mobile {
      font-size: 1.25rem;
    }

    @include xs-only {
      font-size: 1.125rem;
    }
  }
}

.el-table {
  /* Адаптация таблицы для мобильных устройств */
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

.el-button-group {
  .el-button {
    padding: 5px 10px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

</style>
