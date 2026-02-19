import type { CartItem as CartItemType } from "../index";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { removeFromCart, updateQuantity } from "./cartSlice";

const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li>
      {item.name} (${item.price}) x
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) =>
          dispatch(
            updateQuantity({ id: item.id, quantity: Number(e.target.value) }),
          )
        }
        style={{ width: 40, margin: "0 8px" }}
      />
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </li>
  );
};

export default CartItem;
