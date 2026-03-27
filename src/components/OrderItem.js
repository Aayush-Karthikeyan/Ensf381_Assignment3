function OrderItem({ item, onRemove }) {
  const unitPrice = parseFloat(item.price.replace("$", ""));
  const totalPrice = (unitPrice * item.quantity).toFixed(2);

  return (
    <div>
      <p>{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${totalPrice}</p>
      <button className="remove" onClick={() => onRemove(item.id)}>
        Remove Item
      </button>
    </div>
  );
}

export default OrderItem;
