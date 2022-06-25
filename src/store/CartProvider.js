import {useReducer} from "react";
import CartCTX from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      let existingCartItem;
      let updateItems;
      let existingCartItemIndex = state.items.findIndex(
        item => item.id === action.item.id
      );
      if (existingCartItemIndex < 0) {
        existingCartItemIndex = null;
      } else {
        existingCartItem = state.items[existingCartItemIndex];
      }

      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
      } else {
        updateItems = state.items.concat(action.item);
      }

      return {items: updateItems, totalAmount: updateTotalAmount};
    }
    case "REMOVE_ITEM": {
      let existingCartItem;
      let updateItems;
      let existingCartItemIndex = state.items.findIndex(
        item => item.id === action.id
      );
      if (existingCartItemIndex < 0) {
        existingCartItemIndex = null;
      } else {
        existingCartItem = state.items[existingCartItemIndex];
      }
      const updateTotalAmount = state.totalAmount - existingCartItem.price;
      if (existingCartItem.amount === 1) {
        updateItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
      }
      return {items: updateItems, totalAmount: updateTotalAmount};
    }
    default:
      console.log("bye");
  }
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const addItemCartHandler = item => {
    cartDispatch({type: "ADD_ITEM", item: item});
  };

  const removeItemCartHandler = id => {
    cartDispatch({type: "REMOVE_ITEM", id: id});
  };

  const cartCTX = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };

  return <CartCTX.Provider value={cartCTX}>{props.children}</CartCTX.Provider>;
};

export default CartProvider;
