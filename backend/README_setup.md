# Django Ninja Backend API

## 📌 Project Overview
This is a Django Ninja-based backend API following the **Controller-Service-Repository-Model** architecture pattern. It is containerized with Docker and uses **PostgreSQL** as the database.

## 📂 Project Structure
```
backend/
│── src/
│   ├── controller/        # API layer (routes and request handling)
│   │   ├── __init__.py
│   │   ├── user_controller.py
│   │   ├── auth_controller.py
│   │   ├── order_controller.py
│   │
│   ├── repository/        # Direct DB interactions
│   │   ├── __init__.py
│   │   ├── user_repository.py
│   │   ├── order_repository.py
│   │
│   ├── service/           # Business logic
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   ├── order_service.py
│   │
│   ├── model/             # Django ORM models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── order.py
│   │
│   ├── schema/            # Pydantic schemas for request/response validation
│   │   ├── __init__.py
│   │   ├── user_schema.py
│   │   ├── order_schema.py
│   │
│   ├── api.py             # Registers controllers (entry point for routers)
│   ├── database.py        # DB connection and session management
│   ├── settings.py        # Django settings
│   ├── urls.py            # URL routing
│   ├── asgi.py            # ASGI entry point
│   ├── wsgi.py            # WSGI entry point
│
├── Dockerfile             # Docker image setup
├── docker-compose.yml     # Docker Compose for DB & backend
├── .env                   # Environment variables
├── manage.py              # Django CLI
```

---

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 🔧 Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Chimp56/instatry_backend
   cd instatry_backend
   ```

2. **Create and configure environment variables:**
   ```sh
   cp .env.example .env
   ```
   Update `.env` with appropriate values for the database and Django settings.

3. **Start the application using Docker:**
   ```sh
   docker-compose up --build
   ```
   This will:
   - Build the backend container
   - Start a PostgreSQL database instance

4. **Run database migrations:**
   ```sh
   docker exec -it django-backend python manage.py migrate
   ```

5. **Create a superuser (optional, for admin access):**
   ```sh
   docker exec -it django-backend python manage.py createsuperuser
   ```

6. **Access the API:**
   - Open [http://127.0.0.1:8000/api/docs#/](http://127.0.0.1:8000/api/docs#/) for the Django Ninja interactive API documentation.

---

## 🏗️ Architecture
- **Controller Layer:** Handles API requests and responses (`src/controller/`)
- **Service Layer:** Contains business logic (`src/service/`)
- **Repository Layer:** Handles database interactions (`src/repository/`)
- **Model Layer:** Defines Django ORM models (`src/model/`)
- **Schema Layer:** Defines request/response validation using Pydantic (`src/schema/`)

---

## 🔥 API Documentation
Django Ninja provides built-in OpenAPI documentation:
- Visit: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🐳 Docker Setup
### **Build and Run Containers**
```sh
docker-compose up --build
```

### **Stop Containers**
```sh
docker-compose down
```

### **Rebuild Without Cache**
```sh
docker-compose build --no-cache
```

---

## 📜 License
This project is licensed under the MIT License.

---

## 💡 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## ❓ Need Help?
Feel free to open an issue or reach out to the maintainers.

