import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadARItem from "./pages/UploadARItem";
import UserProfile from "./pages/UserProfile";
import { CartProvider } from "./context/CartContext";

// wrapper that uses AnimatePresence
function AnimatedRoutes({ user, onLogin, onSignup, onLogout }) {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            user
              ? <Dashboard onLogout={onLogout} />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={
            user
              ? <CartPage />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/sell"
          element={
            user
              ? <UploadARItem />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            user
              ? <UserProfile user={user} />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" />
              : <LoginPage onLogin={onLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            user
              ? <Navigate to="/" />
              : <SignupPage onSignup={onSignup} />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    console.log("User logged in:", username);
  };

  const handleSignup = (username) => {
    setUser(username);
    console.log("User signed up:", username);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        {/* 3️⃣ Render animated routes instead of plain <Routes> */}
        <AnimatedRoutes
          user={user}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onLogout={handleLogout}
        />
      </Router>
    </CartProvider>
  );
}

export default App;
