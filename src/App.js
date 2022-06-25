import {useState} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);
  const cartToggleHandler = () => {
    setShowCart(!showCart);
  };

  return (
    <CartProvider>
      {showCart && <Cart onToggleCart={cartToggleHandler} />}
      <Header onToggleCart={cartToggleHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
