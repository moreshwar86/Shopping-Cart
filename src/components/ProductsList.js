import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { addItemToCart, updateProductsItems } from "../actions";

import '../App.css'

class ProductsList extends React.Component {
   
  addToCart(item) {
    var i = {
      ...item,
      inCart: true,
      quantityInCart : 1
    }
    this.props.addItemToCart(i);
    this.props.updateProductsItems(i);
  }

  redirectToCart= () => {
    this.props.history.push(`/cart`)
  }

  render() {
    var products = this.props.products;
    var cartData = this.props.cartData.cartItem;
   
    return (
        <div id="page-content-wrapper">
        <div>
          {products &&
            <span class="label label-default" style={{ "margin": "10px" }}>{products.length} Product(s) found.</span>
          }
        </div>
        <div className="item-row">
          {products &&
            products.map((prod, index) => (
              
              <div className="item-column item-card">
                {/* card-img-top */}
                {/* <img src={prod.image} className="productList-image" /> */}
                <div className="card-body" >
                  <h6 className="card-title" style={{ "font-size": "small" }}>{prod.title}</h6>
                  <p className="card-text" style={{ "font-size": "small" }}>
                    Price : {prod.currencyFormat}{prod.price}<br />
                    Availabe size : {prod.availableSizes.map((size) => (<span style={{ "display": "inline" }}>{size} </span>))}
                  </p>
                  <button type="button" className="btn btn-labeled btn-info"
                    onClick={() => { this.addToCart(prod) }}
                    disabled={prod.inCart}>
                    {prod.inCart ? "Item in cart" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div id="cart-wrapper">   
          <button type="button" class="btn btn-labeled btn-warning" onClick={this.redirectToCart} >
              <span class="btn-label"><i class="glyphicon glyphicon-shopping-cart"></i></span>
              {cartData.length == 0 ? "" : " - " + cartData.length}
          </button>      
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return { getCartData : state.cartReducer };
// };

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: item => dispatch(addItemToCart(item)),
    updateProductsItems: item => dispatch(updateProductsItems(item))
  };
}

export default connect(null, mapDispatchToProps)(withRouter(ProductsList));