FROM python:3.11-slim

WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Копирование файлов зависимостей
COPY requirements.txt .

# Установка Python зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . .


# Создание скрипта для проверки доступности базы данных
RUN echo '#!/bin/bash\n\
    until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "postgres" -d "sova" -c "\q"; do\n\
    echo "Postgres is unavailable - sleeping"\n\
    sleep 1\n\
    done\n\
    \n\
    echo "Postgres is up - executing command"\n\
    \n\
    export ENV=development\n\
    cd /app && uvicorn main:app --host 0.0.0.0 --port 8000 --reload' > /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
