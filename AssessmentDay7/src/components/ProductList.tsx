import type { Product } from "../index";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../cart/store";
import { addToCart } from "../cart/cartSlice";

const PRODUCTS: Product[] = [
  { id: 1, name: "Apple", price: 2 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Carrot", price: 3 },
];

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {product.name} (${product.price})
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
