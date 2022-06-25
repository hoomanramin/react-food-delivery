import {createContext} from "react";

const CartCTX = createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: id => {},
});
export default CartCTX;
