import React from "react";
import Filter from "./components/filter";
import Products from "./components/products";
import Cart from "./components/cart";
import CheckoutForm from "./components/checkoutForm";
import Bounce from "react-reveal/Bounce";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckoutFormVisible: false,
    };
  }

  hideCheckoutForm = () => {
    this.setState({
      isCheckoutFormVisible: false,
    });
    window.location.reload();
  };

  showCheckoutForm = () => {
    this.setState({
      isCheckoutFormVisible: true,
    });
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
                <Cart proceed={this.handleProceed} />
                {this.state.isCheckoutFormVisible && (
                  <Bounce right>
                    <div className="checkout">
                      <CheckoutForm hideCheckoutForm={this.hideCheckoutForm} />
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
