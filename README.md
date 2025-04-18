# InstaFit: A Fashion Marketplace with AR Try-On

## Introduction

InstaFit is a fashion marketplace designed to enhance the shopping experience by integrating **Augmented Reality (AR)** try-on functionality. Users can browse for clothing, try on garments virtually, and even upload their own clothing for AR integration. InstaFit bridges the gap between **AI** and **fashion**, offering a more authentic and interactive shopping experience.

---

## Features

### User Features
- **Account Management**: Create accounts and log in to access personalized features.
- **Marketplace Browsing**: Explore a wide range of clothing items with search and filter options.
- **AR Try-On**: Virtually try on garments using AR technology.
- **Upload Clothing**: Users can upload their own clothing for AR try-on.
- **Shopping Cart**: Add items to the cart, adjust quantities, and proceed to checkout.

---

## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **React Router**: For navigation and routing.
- **Three.js**: For rendering 3D models in AR try-on.
- **CSS/PostCSS**: For styling the application.

### Backend
- **Django Ninja**: For building a fast and scalable REST API.
- **PostgreSQL**: For database management.
- **Pydantic**: For request/response validation.
- **Hugging Face**: For AI-based image detection and verification.

---

## 📂 Project Structure

### Frontend
```
frontend/
├── src/
│   ├── api/                # API integration
│   ├── components/         # Reusable UI components
│   ├── context/            # Context API for state management
│   ├── pages/              # Application pages (Dashboard, Cart, Login, etc.)
│   ├── styles/             # CSS/PostCSS styles
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point for React
│   └── ...                 # Other configuration files
├── public/                 # Static assets (images, icons, etc.)
└── package.json            # Frontend dependencies
```

### Backend
```
backend/
├── src/
│   ├── controller/         # API routes and request handling
│   ├── repository/         # Database interactions
│   ├── service/            # Business logic
│   ├── model/              # Django ORM models
│   ├── schema/             # Pydantic schemas for validation
│   ├── api.py              # Registers API routes
│   ├── settings.py         # Django settings
│   ├── urls.py             # URL routing
│   ├── asgi.py             # ASGI entry point
│   ├── wsgi.py             # WSGI entry point
│   └── ...                 # Other configuration files
├── manage.py               # Django CLI
├── requirements.txt        # Backend dependencies
└── .env                    # Environment variables
```

---

##  Getting Started

### Prerequisites
- **Node.js** (v16+)
- **Python** (v3.10+)
- **Docker** (optional, for Docker Compose setup)

---

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```sh
   cd frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm start
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Backend Setup

1. **Navigate to the backend directory**:
   ```sh
   cd backend
   ```

2. **Create a virtual environment**:
   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

5. **Set up the database**:
   - Update the `.env` file with your PostgreSQL credentials.
   - Apply migrations:
     ```sh
     python manage.py makemigrations
     python manage.py migrate
     ```

6. **Run the development server**:
   ```sh
   python manage.py runserver
   ```

7. **Access the API**:

   Open  [http://localhost:8000/api/docs](http://localhost:8000/api/docs) in your browser for the Django Ninja interactive API documentation.


---

#### Alternative: Using Docker Compose

If the manual setup doesn't work, you can use Docker Compose to set up the project:

1. **Navigate to the backend directory**:
   ```sh
   cd backend
   ```

2. **Run Docker Compose**:
   ```sh
   docker-compose up --build
   ```

3. **Access the API**:

   Open  [http://localhost:8000/api/docs](http://localhost:8000/api/docs) in your browser for the Django Ninja interactive API documentation.

---

## Testing

### Frontend
1. **Run tests**:
   ```sh
   npm test
   ```

2. **Add tests**:
   - Write unit tests for components in the `src/components/` directory.
   - Use Jest and React Testing Library.

### Backend
1. **Run tests**:
   ```sh
   python -m unittest
   ```

2. **Add tests**:
   - Write tests for services, repositories, and controllers in the `tests/` directory.

---

##  API Documentation

The backend API is documented using **Django Ninja**. Access the interactive documentation at:
- [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature-branch
   ```
3. **Commit your changes**:
   ```sh
   git commit -m "Add new feature"
   ```
4. **Push to the branch**:
   ```sh
   git push origin feature-branch
   ```
5. **Create a Pull Request**.

---

## 📈 Expected Impact

- Enhanced shopping experience with AR try-ons.
- More authentic and trustworthy marketplace.
- Integration of AI for fashion and authenticity verification.