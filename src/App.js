import React from "react";
import Filter from "./components/filter";
import Products from "./components/products";
import Cart from "./components/cart";
import data from "./data.json";
import CheckoutForm from "./components/checkoutForm";

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

  handleOrder = (event) => {
    let { value } = event.target;

    let { products } = this.state;

    let orderedProducts = products.sort((a, b) => {
      if (value === "lowest") {
        return a.price > b.price ? 1 : -1;
      } else if (value === "highest") {
        return a.price < b.price ? 1 : -1;
      } else {
        return a._id < b._id ? 1 : -1;
      }
    });

    this.setState({
      product: orderedProducts,
    });
  };

  handleFilter = (event) => {
    let { value } = event.target;
    if (value === "all") {
      this.setState({
        products: data.products,
      });
    } else {
      let filteredProducts = data.products.filter((product) => {
        return product.availableSizes.indexOf(value) >= 0;
      });

      this.setState({
        products: filteredProducts,
      });
    }
  };

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
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }
    );
  };

  handleCheckout = (formInputs) => {
    console.log(formInputs);
  };

  handleProceed = () => {
    this.setState({
      isCheckoutFormVisible: true,
    });
  };
  render() {
    return (
      <div className="container">
        <header>
          <a href="/">Shopping card</a>
          <a href="/admin">Admin</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                order={this.handleOrder}
                filter={this.handleFilter}
                length={this.state.products.length}
              />
              <Products
                products={this.state.products}
                addToCart={this.handleAddToCart}
              />
            </div>
            <div className="cart__container">
              <Cart
                cartList={this.state.cartList}
                removeFromCart={this.handleRemoveFromCart}
                proceed={this.handleProceed}
              />
              {this.state.isCheckoutFormVisible && (
                <div className="checkout">
                  <CheckoutForm checkout={this.handleCheckout} />
                </div>
              )}
            </div>
          </div>
        </main>
        <footer>All rights are reserved.</footer>
      </div>
    );
  }
}

export default App;
