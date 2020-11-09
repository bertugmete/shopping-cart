import React from "react";
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
  render() {
    return (
      <div className="container">
        <header>
          <a href="/">Shopping card</a>
          <a href="/admin">Admin</a>
        </header>
        <main>
          <div>Product List</div>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
          </div>
        </main>
        <footer>All rights are reserved.</footer>
      </div>
    );
  }
}

export default App;
