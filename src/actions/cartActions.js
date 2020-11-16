import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (productId) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();

  let itemInCart = cartItems.find((item) => item._id === productId);

  if (itemInCart) {
    let index = cartItems.indexOf(itemInCart);

    cartItems[index] = { ...itemInCart, amount: ++cartItems[index].amount };
  } else {
    let products = getState().products.items;

    let product = products.find((item) => item._id === productId);
    cartItems.push({ ...product, amount: 1 });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (productId) => (dispatch) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));

  let willDecriseProduct = cartItems.find((cart) => cart._id === productId);

  if (willDecriseProduct.amount === 1) {
    let index = cartItems.indexOf(willDecriseProduct);
    cartItems.splice(index, 1);
  } else {
    let index = cartItems.indexOf(willDecriseProduct);
    cartItems[index] = {
      ...cartItems[index],
      amount: --cartItems[index].amount,
    };
  }

  dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
