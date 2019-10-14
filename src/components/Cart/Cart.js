import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CartItem from './CartItem';
import './cart.css'

import { removeItemFromCart, updateProductsItems } from "../../actions"

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            quantity: 0,
            amountToPay: 0,
            itemsInCart: []
        }
        this.removeFromCart = this.removeFromCart.bind(this);
        this.updateAmountToPay = this.updateAmountToPay.bind(this);
    }

    updateAmountToPay(item) {
        this.forceUpdate();
    }

    removeFromCart(item) {
        var i = {
            ...item,
            inCart: false,
            quantityInCart : 0
        }
        this.props.removeItemFromCart(i);
        this.props.updateProductsItems(i);
    }

    redirectToProductList= () => {
        this.props.history.push(`/`)
      }

    render() {
        var cartItem = this.props.items.cartItem;
        
        let itemsInCart = cartItem.map((item, index) => {
            return <CartItem key={index} 
                     item={item}
                     indexInCart={index}
                     removeFromCart={this.removeFromCart}
                     updateAmountToPay={this.updateAmountToPay} 
                     />  
          });
          let amountToPay = 0;
          for (let i=0; i< cartItem.length; i++) {
            amountToPay += cartItem[i].price * cartItem[i].quantityInCart;
          }

      return(
        <div>   
            <section id="shopping-cart">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <div class="row">
                                <div class="col-xs-6" style={{"width": "97%"}}>
                                    <h5><span class="glyphicon glyphicon-shopping-cart"></span> My Cart {itemsInCart.length == 0 ? "" : `(`+ cartItem.length+`)`}</h5>
                                </div>
                                <i className="glyphicon glyphicon-remove fa-times-circle" onClick={this.redirectToProductList}></i>
                            </div>
                        </div>
                    </div>
                </div>
                {itemsInCart.length == 0 && (
                    <>     
                        <div class="empty-cart-container">
                            <div class="empty-cart">
                                <img className="empty-cart-img" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" />
                            </div>
                        </div>
                        <h3>Missing Cart items?</h3>
                    </>
                )}

                {itemsInCart.length != 0 && (
                    <>
                    <table id="cart" class="table table-hover table-condensed tableBodyScroll" style={{"background-color": "aliceblue","width" : "70%", "float":"left"}}>
                        <thead>
                            <tr> 
                                <th style={{ "width":"50%"}}>Product</th>
                                <th style={{ "width":"10%"}}>Price</th>
                                <th style={{ "width":"8%"}}>Quantity</th>
                                <th style={{ "width":"22%"}} class="text-center">Subtotal</th>
                                <th style={{ "width":"10%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsInCart}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><a class="btn btn-warning" onClick={this.redirectToProductList}><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
                                <td colspan="2" class="hidden-xs"></td>
                                {/* <td class="hidden-xs text-center"><strong>${amountToPay.toFixed(2)}</strong></td> */}
                                <td />
                                <td><a href="#" class="btn btn-success btn-block">Place Order<i class="fa fa-angle-right"></i></a></td>
                            </tr>
                        </tfoot>		
                        </table>
                        
                        <table id="cart" class="table table-hover table-condensed tableBodyScroll" style={{"background-color": "aliceblue", "width" : "25%", "float":"right", "margin-left": "70%", "position": "fixed"}}>
                        <thead>
                            <tr> 
                                <th style={{ "width":"50%"}}>Price Details</th>
                            </tr>
                        </thead>
                            <tbody>
                                <tr style={{"height": "50px"}}>
                                    <td>Price ({cartItem.length} items)</td>
                                    <td colspan="2" class="hidden-xs"></td>
                                    <td class="hidden-xs text-center"><strong>${amountToPay.toFixed(2)}</strong></td>
                                </tr>
                                <tr style={{"height": "50px"}}>
                                    <td>Delivery</td>
                                    <td colspan="2" class="hidden-xs"></td>
                                    <td class="hidden-xs text-center"><strong>FREE</strong></td>
                                </tr>
                                <tr style={{"height": "50px"}}>
                                    <td>Total Payable</td>
                                    <td colspan="2" class="hidden-xs"></td>
                                    <td class="hidden-xs text-center"><strong>${amountToPay.toFixed(2)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </section>
        </div>
      );
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      removeItemFromCart: item => dispatch(removeItemFromCart(item)),
      updateProductsItems: item => dispatch(updateProductsItems(item))
    };
  }
  export default connect(null, mapDispatchToProps)(withRouter(Cart));