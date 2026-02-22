import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h3>Shopping Cart</h3>
      {items.length === 0 && <div>Cart is empty.</div>}
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div>Total: Rs.{total}</div>
      <button
        onClick={() => dispatch(clearCart())}
        disabled={items.length === 0}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
