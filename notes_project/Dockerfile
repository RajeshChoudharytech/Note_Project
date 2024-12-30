FROM python:3.10-slim


WORKDIR /app

COPY . /app/


RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


RUN pip install --upgrade pip


RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000


# RUN python manage.py migrate
RUN python manage.py migrate

# Command to run the application
CMD ["python","manage.py","runserver","0.0.0.0:8000"]