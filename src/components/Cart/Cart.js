import {useContext, useState} from "react";
import CartCTX from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartItemCTX = useContext(CartCTX);
  const totalAmount = cartItemCTX.totalAmount.toFixed(2);
  const hasItem = cartItemCTX.items.length > 0;

  const addItemHandler = item => {
    cartItemCTX.addItem({...item, amount: 1});
  };

  const removeItemHandler = id => {
    cartItemCTX.removeItem(id);
  };

  const cartItem = cartItemCTX.items.map(item => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={addItemHandler.bind(null, item)}
      onRemove={removeItemHandler.bind(null, item.id)}
    />
  ));

  const checkoutHandler = () => {
    setShowCheckout(true);
  };

  return (
    <Modal>
      <ul className={classes["cart-items"]}>{cartItem}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {showCheckout && <Checkout />}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onToggleCart}>
          Close
        </button>
        {hasItem && (
          <button onClick={checkoutHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
