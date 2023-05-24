#!/bin/bash

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="paymento_tasks"

mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE $DB_NAME;"

echo "Created db: $DB_NAME"
