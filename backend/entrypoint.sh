#!/bin/bash

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "postgres" -d "sova" -c "\q"; do
    echo "Postgres is unavailable - sleeping"
    sleep 1
done

echo "Postgres is up - executing command"

export ENV=development
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
