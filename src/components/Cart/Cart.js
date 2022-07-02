import {useContext, useState} from "react";
import CartCTX from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
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

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch(
      "https://react-request-974a4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({user: userData, orderItems: cartItemCTX.items}),
      }
    );
    setIsSubmitting(false);
    setIsSubmited(true);
    cartItemCTX.clearItems();
  };

  const modalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItem}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout
          onCancel={props.onToggleCart}
          onConfirm={submitOrderHandler}
        />
      )}
      {!showCheckout && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onToggleCart}
          >
            Close
          </button>
          {hasItem && (
            <button onClick={checkoutHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingData = <p>Sending order data</p>;

  const isSubmitedData = (
    <>
      <p>Your order submited we will reachout to you</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onToggleCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal>
      {!isSubmitting && !isSubmited && modalContent}
      {isSubmitting && isSubmittingData}
      {isSubmited && !isSubmitting && isSubmitedData}
    </Modal>
  );
};

export default Cart;
