// src/pages/UserProfile.js
import React, { useState, useEffect } from "react";

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
      // Add more items as needed.
    ]);
    setItemsSold([
      { id: 301, name: "Old Jacket", price: 25.0 },
      // Add more items as needed.
    ]);
  }, [user]);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>User Profile: {user}</h1>
      <section style={{ marginBottom: "2rem" }}>
        <h2>Purchases</h2>
        {purchases.length > 0 ? (
          <ul>
            {purchases.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchases yet.</p>
        )}
      </section>
      <section style={{ marginBottom: "2rem" }}>
        <h2>Items Posted</h2>
        {itemsPosted.length > 0 ? (
          <ul>
            {itemsPosted.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't posted any items yet.</p>
        )}
      </section>
      <section>
        <h2>Items Sold</h2>
        {itemsSold.length > 0 ? (
          <ul>
            {itemsSold.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't sold any items yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
