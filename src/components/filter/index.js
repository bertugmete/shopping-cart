import React, { Component } from "react";
import "./assets/style.scss";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter__container">
        <span>Total Count: {this.props.length}</span>
        <div className="order">
          <span>Order:</span>
          <select onChange={this.props.order}>
            <option value="">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="size">
          <span>Filter:</span>
          <select onChange={this.props.filter}>
            <option value="all">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
