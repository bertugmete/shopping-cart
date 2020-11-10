import React, { Component } from "react";
import "./assets/style.scss";

export default class CheckoutForm extends Component {
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
    this.props.checkout({
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
    });
  };

  hanleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
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
    );
  }
}
