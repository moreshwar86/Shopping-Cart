import React from 'react';
import ProductsList from '../components/ProductsList.js';

class ProductsContainer extends React.Component {

    render() {
      
      if(this.props.data.products != undefined){
          return(
            <ProductsList products={this.props.data.products} cartData={this.props.cartData}/>
        );
      }
      return null;

      
    }
  }
  
export default ProductsContainer;