import {useContext} from "react";
import CartCTX from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";

const HeaderButton = props => {
  const badgeCTX = useContext(CartCTX);
  const badgeNumber = badgeCTX.items?.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${classes.bump}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{badgeNumber}</span>
    </button>
  );
};

export default HeaderButton;
