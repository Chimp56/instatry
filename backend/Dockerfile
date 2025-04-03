FROM python:3.11

WORKDIR /instatry

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .


# Expose the Django port
EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
