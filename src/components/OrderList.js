import { useState, useEffect } from "react";
import OrderItem from "./OrderItem";

function OrderList({ newItem }) {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("sweetScoopOrder");
    if (saved) {
      setOrderItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (newItem) {
      setOrderItems((prevItems) => {
        const existing = prevItems.find((item) => item.id === newItem.id);
        let updatedItems;
        if (existing) {
          updatedItems = prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
        }
        localStorage.setItem("sweetScoopOrder", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  }, [newItem]);

  function handleRemove(id) {
    setOrderItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === id);
      let updatedItems;
      if (existing && existing.quantity > 1) {
        updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedItems = prevItems.filter((item) => item.id !== id);
      }
      localStorage.setItem("sweetScoopOrder", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  function calculateTotal() {
    return orderItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  }

  return (
    <div>
      <h2>Your Order</h2>
      <div className="order-list">
      {orderItems.length === 0 ? (
        <p>No items in your order yet.</p>
      ) : (
        orderItems.map((item) => (
          <OrderItem key={item.id} item={item} onRemove={handleRemove} />
        ))
      )}
      <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
}

export default OrderList;
