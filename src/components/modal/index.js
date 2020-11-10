import React, { Component } from "react";
import Modal from "react-modal";
import "./assets/style.scss";

export default class CustomModal extends Component {
  render() {
    return (
      <Modal {...this.props} className="Modal" overlayClassName="Overlay">
        <div className="selected__product">
          <button className="close__modal" onClick={this.props.close}>
            X
          </button>
          {this.props.children}
        </div>
      </Modal>
    );
  }
}
