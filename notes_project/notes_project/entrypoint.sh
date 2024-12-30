# Run database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start the application
exec "$@"
