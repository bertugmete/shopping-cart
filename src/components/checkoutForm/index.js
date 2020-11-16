import React, { Component } from "react";
import { connect } from "react-redux";
import "./assets/style.scss";
import { createOrder, clearOrder } from "../../actions/orderActions";
import CustomModal from "../modal";
import { formatCurrency } from "../../utils";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      address: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce(
        (acc, current) => acc + current.price * current.amount,
        0
      ),
    };

    this.setState(
      {
        isModalOpen: true,
      },
      () => this.props.createOrder(order)
    );
  };

  hanleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCloseModal = () => {
    this.setState(
      {
        isModalOpen: false,
      },
      () => {
        this.props.hideCheckoutForm();
        this.props.clearOrder();
      }
    );
  };

  render() {
    let { order } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              onChange={this.hanleInputChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              onChange={this.hanleInputChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              required
              onChange={this.hanleInputChange}
            />
          </div>
          <button className="button button__proceed" type="submit">
            Checkout
          </button>
        </form>
        {this.state.isModalOpen && order && (
          <CustomModal
            isOpen={this.state.isModalOpen}
            close={this.handleCloseModal}
          >
            <div className="order__info">
              <h3 className="success__message">Your order has been placed.</h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>{order.createdAt}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{formatCurrency(order.total)}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {order.cartItems.map((x) => (
                      <div>
                        {x.amount} {" x "} {x.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </CustomModal>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { createOrder, clearOrder }
)(CheckoutForm);
