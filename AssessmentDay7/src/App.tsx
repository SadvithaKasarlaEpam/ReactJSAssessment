import ProductList from "./components/ProductList";
import Cart from "./cart/Cart";

const App = () => (
  <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
    <h2>Shopping Cart (Redux Toolkit Example)</h2>
    <ProductList />
    <hr />
    <Cart />
  </div>
);

export default App;
