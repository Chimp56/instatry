# Django Ninja Backend API

## Overview
This is a Django Ninja-based backend API following the **Controller-Service-Repository-Model** architecture pattern. It uses **PostgreSQL** as the database.

## 📂 Project Structure
```
backend/
│── src/
│   ├── controller/        # API layer (routes and request handling)
│   │
│   ├── repository/        # Direct DB interactions
│   │
│   ├── service/           # Business logic
│   │
│   ├── model/             # Django ORM models
│   │
│   ├── schema/            # Pydantic schemas for request/response validation
│   │
│   ├── api.py             # Registers controllers (entry point for routers)
│   ├── database.py        # DB connection and session management
│   ├── settings.py        # Django settings
│   ├── urls.py            # URL routing
│   ├── asgi.py            # ASGI entry point
│   ├── wsgi.py            # WSGI entry point
│
├── .env                   # Environment variables
├── manage.py              # Django CLI
├── requirements.txt       # Python dependencies
```

---

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)

### 🔧 Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Chimp56/instatry
   cd instatry
   ```

2. **Change directory to backend:**
   ```sh
   cd backend
   ```
3. **Create a virtual environment:**
   ```sh
   python -m venv venv
   ```
4. **Activate the virtual environment:**
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
5. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
6. **Make migrations:**
   ```sh
   python manage.py makemigrations
   ```
7. **Apply migrations:**
   ```sh
   python manage.py migrate
   ```
8. **Run the server:**
   ```sh
   python manage.py runserver
   ```
9. **Access the API:**
   - Open [http://127.0.0.1:8000/api/docs#/](http://127.0.0.1:8000/api/docs#/) for the Django Ninja interactive API documentation.

---

## Architecture
- **Controller Layer:** Handles API requests and responses (`src/controller/`)
- **Service Layer:** Contains business logic (`src/service/`)
- **Repository Layer:** Handles database interactions (`src/repository/`)
- **Model Layer:** Defines Django ORM models (`src/model/`)
- **Schema Layer:** Defines request/response validation using Pydantic (`src/schema/`)

---

## API Documentation
Django Ninja provides built-in OpenAPI documentation:
- Visit: [http://localhost:8000/api/docs#/](http://localhost:8000/api/docs#/)

---

## Testing
### Running Tests
1. **Run tests:**
   ```sh
   python -m unittest
   ```

Tests are located in the `tests` directory. You can run all tests or specify a particular test file.

### Adding Tests
- Create a new test file in the `tests` directory.
- Use the `unittest` framework to write your tests.


## 📜 License
This project is licensed under the MIT License.

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## Quick setup

```sh
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
http://localhost:8000/api/docs
```