#!/bin/bash
set -e

until nc -z -w 1 "$DB_HOST" "$DB_PORT"; do
  >&2 echo "Waiting 5 seconds for MySQL startup..."
  sleep 5
done
>&2 echo "MySQL is ready"

# Start the Backend
exec node server.js