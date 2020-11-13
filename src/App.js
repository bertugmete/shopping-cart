import React from "react";
import Filter from "./components/filter";
import Products from "./components/products";
import Cart from "./components/cart";
import data from "./data.json";
import CheckoutForm from "./components/checkoutForm";
import Bounce from "react-reveal/Bounce";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartList: localStorage.getItem("cartList")
        ? JSON.parse(localStorage.getItem("cartList"))
        : [],
      isCheckoutFormVisible: false,
    };
  }

  handleAddToCart = (_id) => {
    let { cartList } = this.state;
    let cartItem = cartList.find((cartItem) => cartItem._id === _id);

    if (!cartItem) {
      let willAddToCartList = data.products.find(
        (product) => product._id === _id
      );
      cartList.push({ ...willAddToCartList, amount: 1 });
    } else {
      cartList = cartList.map((cartItem) => {
        if (cartItem._id === _id) {
          cartItem.amount++;
        }
        return cartItem;
      });
    }
    this.setState(
      {
        cartList,
      },
      () => {
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }
    );
  };

  handleRemoveFromCart = (_id) => {
    let { cartList } = this.state;
    debugger;
    let cart = cartList.find((cartItem) => cartItem._id === _id);

    let cartIndex = cartList.indexOf(cart);
    if (cart.amount === 1) {
      cartList.splice(cartIndex, 1);
    } else {
      cartList[cartIndex] = { ...cart, amount: cart.amount - 1 };
    }

    this.setState(
      {
        cartList,
      },
      () => {
        cartList.length < 1 && this.hideCheckoutForm();
      }
    );
  };

  hideCheckoutForm = () => {
    this.setState({
      isCheckoutFormVisible: false,
    });
  };

  showCheckoutForm = () => {
    this.setState({
      isCheckoutFormVisible: true,
    });
  };

  handleCheckout = (formInputs) => {
    console.log(formInputs);
  };

  handleProceed = () => {
    this.showCheckoutForm();
  };
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <header>
            <a href="/">Shopping card</a>
            <a href="/admin">Admin</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.handleAddToCart} />
              </div>
              <div className="cart__container">
                <Cart
                  cartList={this.state.cartList}
                  removeFromCart={this.handleRemoveFromCart}
                  proceed={this.handleProceed}
                />
                {this.state.isCheckoutFormVisible &&
                  this.state.cartList.length > 0 && (
                    <Bounce right>
                      <div className="checkout">
                        <CheckoutForm checkout={this.handleCheckout} />
                      </div>
                    </Bounce>
                  )}
              </div>
            </div>
          </main>
          <footer>All rights are reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
