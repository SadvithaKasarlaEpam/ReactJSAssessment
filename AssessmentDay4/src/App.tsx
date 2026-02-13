import { CartProvider } from "./components/CartContext";
import { useProducts } from "./hook/useProducts";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Shirt", price: 1, category: "Clothing" },
  { id: 2, name: "Kurta", price: 2, category: "Clothing" },
  { id: 3, name: "Rice", price: 3, category: "Food" },
  { id: 4, name: "Bread", price: 4, category: "Food" },
];

const CATEGORIES = [
  "all",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

const App = () => {
  const { search, setSearch, category, setCategory, filtered } =
    useProducts(PRODUCTS);

  return (
    <CartProvider>
      <div>
        <h2>E-Commerce Product Dashboard</h2>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ProductList products={filtered} />
        <hr />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
