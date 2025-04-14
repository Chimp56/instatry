import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/UserProfile.css";

const UserProfile = ({ user }) => {
  // Dummy data for simulation; later replace with API calls.
  const [purchases, setPurchases] = useState([]);
  const [itemsPosted, setItemsPosted] = useState([]);
  const [itemsSold, setItemsSold] = useState([]);

  useEffect(() => {
    // Simulate fetching data for the user.
    setPurchases([
      { id: 101, name: "Red T-Shirt", price: 20.0 },
      { id: 102, name: "Wizard Hat", price: 30.0 },
    ]);
    setItemsPosted([
      { id: 201, name: "Victorian Dress", price: 50.0 },
    ]);
    setItemsSold([
      { id: 301, name: "Old Jacket", price: 25.0 },
    ]);
  }, [user]);

  return (
    <div className="profile-container">
      <h1 className="profile-header">
        <FaUserCircle className="profile-icon" />
        User Profile: {user}
      </h1>

      <section className="profile-section">
        <h2 className="section-title">Purchases</h2>
        {purchases.length > 0 ? (
          <ul className="profile-list">
            {purchases.map((item) => (
              <li key={item.id} className="profile-list-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">No purchases yet.</p>
        )}
      </section>

      <section className="profile-section">
        <h2 className="section-title">Items Posted</h2>
        {itemsPosted.length > 0 ? (
          <ul className="profile-list">
            {itemsPosted.map((item) => (
              <li key={item.id} className="profile-list-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">You haven't posted any items yet.</p>
        )}
      </section>

      <section className="profile-section">
        <h2 className="section-title">Items Sold</h2>
        {itemsSold.length > 0 ? (
          <ul className="profile-list">
            {itemsSold.map((item) => (
              <li key={item.id} className="profile-list-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">You haven't sold any items yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
