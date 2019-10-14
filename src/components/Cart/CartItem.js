import React from 'react';

import './cart.css';

class CartItem extends React.Component {
    constructor(props) {
      super(props);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
    }
    handleRemoveFromCart(e) {
      // let x = window.confirm("Do you want to remove item?");
      // if(x){
        this.props.removeFromCart(e.props.item);
      // }
    }

    handleQuantityChange(e) {
      this.props.item.quantityInCart = e.target.value;
      this.props.updateAmountToPay(this.props.item);
    }
    render() {
      var item = this.props.item;
        
      return(
        <>
        <tr>
          <td data-th="Product">
            <div class="row">
              <div class="col-sm-2 hidden-xs"><img src={item.image} alt="..." class="img-responsive"/></div>
              <div class="col-sm-10">
                <h4 class="nomargin">{item.title}</h4>
                <p>Desc</p>
              </div>
            </div>
          </td>
          <td data-th="Price">{item.currencyFormat} {item.price}</td>
          <td data-th="Quantity">
          {/* <a className="count-circle" onClick={this.handleQuantityChange}>-</a> {item.quantityInCart} <a onClick={this.handleQuantityChange} className="count-circle">+</a> */}
          <input type="number" name="quantity" min="1" max="10" onChange={this.handleQuantityChange} 
                value={item.quantityInCart} />
          </td>
          <td data-th="Subtotal" class="text-center">
            {item.quantityInCart==undefined ? (item.currencyFormat + item.price) : item.currencyFormat + (item.price * item.quantityInCart)}
          </td>
          <td class="actions" data-th="">
            <button class="btn btn-danger btn-sm" onClick={() => this.handleRemoveFromCart(this)}>
              <span class="glyphicon glyphicon-trash"/>
            </button>								
          </td>
        </tr>
        </>
      )
    }
  }

export default CartItem;