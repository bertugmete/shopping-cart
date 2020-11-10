import React, { Component } from "react";
import { formatCurrency } from "../../utils";
import "./assests/style.scss";

export default class Products extends Component {
  handleOnClick = (id) => {
    this.props.addToCart(id);
  };

  renderProducts = () => {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => {
            return (
              <li key={product._id}>
                <div className="product">
                  <a href={`#${product._id}`}>
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="price">
                    <div>
                      <span>{formatCurrency(product.price)}</span>
                    </div>
                    <button
                      className="button button__basket"
                      onClick={() => this.handleOnClick(product._id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  render() {
    return this.props.products.length > 0 && this.renderProducts();
  }
}
