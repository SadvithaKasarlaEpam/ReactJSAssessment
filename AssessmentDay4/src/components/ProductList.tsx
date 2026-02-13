import type { Product } from "../App";
import { useCart } from "./CartContext";

const ProductList = ({ products }: { products: Product[] }) => {
  const { addToCart } = useCart();

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} (Rs.{p.price}) - {p.category}
            <button onClick={() => addToCart(p)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
