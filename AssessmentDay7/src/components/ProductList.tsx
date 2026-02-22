import type { Product } from "../index";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../cart/store";
import { addToCart } from "../cart/cartSlice";

const PRODUCTS: Product[] = [
  { id: 1, name: "Shirt", price: 1 },
  { id: 2, name: "Kurta", price: 2 },
  { id: 3, name: "Rice", price: 3 },
  { id: 4, name: "Bread", price: 4 },
];

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {product.name} (Rs.{product.price})
            <button
              style={{ marginLeft: 8 }}
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
