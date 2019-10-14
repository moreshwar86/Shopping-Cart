import React from 'react';
import { connect } from 'react-redux'

import Cart from '../components/Cart/Cart'

class CartContainer extends React.Component {

    render() {
      return(
        <Cart items={this.props.getCartData} />
      );
    }
  }

  const mapStateToProps = state => {
    return { getCartData : state.cartReducer };
  };

  export default connect(
    mapStateToProps,
    null
  )(CartContainer);

