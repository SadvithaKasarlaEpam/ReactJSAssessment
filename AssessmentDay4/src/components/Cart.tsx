import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();

  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} (Rs.{item.price * item.quantity})
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>Total: Rs.{total} </div>
      <button onClick={clearCart} disabled={cart.length === 0}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
