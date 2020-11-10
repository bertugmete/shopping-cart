import React, { Component } from "react";
import { formatCurrency } from "../../utils";
import "./assets/style.scss";

export default class Cart extends Component {
  handleRemove = (_id) => {
    this.props.removeFromCart(_id);
  };

  renderCartList = () => {
    return (
      <div className="cart__list">
        <ul>
          {this.props.cartList.map((cartItem) => {
            return (
              <li>
                <div className="product__info">
                  <img src={cartItem.image} alt={cartItem.title} />
                  <span>{cartItem.title}</span>
                </div>
                <div className="actions">
                  <span>
                    {formatCurrency(cartItem.price)} x {cartItem.amount}
                  </span>
                  <button
                    className="button button__remove"
                    onClick={() => this.handleRemove(cartItem._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    let headerText =
      this.props.cartList.length > 0
        ? `You have ${this.props.cartList.reduce((a, c) => a + c.amount, 0)} in
      the cart`
        : "Add prodcut to your cart";
    return (
      <div className="cart">
        <div className="cart__header">
          <span>{headerText}</span>
        </div>
        {this.props.cartList.length > 0 && (
          <React.Fragment>
            {this.renderCartList()}
            <div className="total__cart">
              <div className="total__price">
                <span>Total:</span>
                <span>
                  {formatCurrency(
                    this.props.cartList.reduce(
                      (a, c) => a + c.price * c.amount,
                      0
                    )
                  )}
                </span>
              </div>
              <button
                className="button button__proceed"
                onClick={this.props.proceed}
              >
                Proceed
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
