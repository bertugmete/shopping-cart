import React from "react";
import Filter from "./components/filter";
import Products from "./components/products";
import data from "./data.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  handleOrder = (event) => {
    let { value } = event.target;

    let { products } = this.state;

    let orderedProducts = products.sort((a, b) => {
      debugger;
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
              <Products products={this.state.products} />
            </div>
            <div>Cart</div>
          </div>
        </main>
        <footer>All rights are reserved.</footer>
      </div>
    );
  }
}

export default App;
