import React, { Component } from "react";
import { formatCurrency } from "../../utils";
import Slide from "react-reveal/Slide";
import "./assests/style.scss";
import CustomModal from "../modal";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedProduct: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleOnClick = (id) => {
    this.props.addToCart(id);
  };

  handleSelectedProduct = (product) => {
    this.setState(
      {
        selectedProduct: product,
      },
      () => {
        this.handleOpenModal();
      }
    );
  };

  handleOpenModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  renderProducts = () => {
    return (
      <React.Fragment>
        <Slide right>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => {
                return (
                  <li key={product._id}>
                    <div className="product">
                      <a
                        href={`#${product._id}`}
                        onClick={() => this.handleSelectedProduct(product)}
                      >
                        <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                      </a>
                      <div className="price">
                        <div>
                          <span>{formatCurrency(product.price)}</span>
                        </div>
                        <button
                          className="button button__basket"
                          onClick={() => this.props.addToCart(product._id)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Slide>
      </React.Fragment>
    );
  };

  render() {
    let { selectedProduct, isModalOpen } = this.state;
    return (
      <div className="product__container">
        {this.props.products &&
          this.props.products.length > 0 &&
          this.renderProducts()}
        {this.state.isModalOpen && selectedProduct && (
          <CustomModal isOpen={isModalOpen} close={this.handleCloseModal}>
            <div className="selected__product">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              <div className="information">
                <h2>{selectedProduct.title}</h2>
                <p>{selectedProduct.description}</p>
                <span>{formatCurrency(selectedProduct.price)}</span>
                <button
                  className="button button__basket"
                  onClick={() => {
                    this.props.addToCart(selectedProduct._id);
                    this.handleCloseModal();
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </CustomModal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
