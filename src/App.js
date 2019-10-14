import React, {Component} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProductsData } from './actions/index';

import './App.css';
import SideBar from './SideBar'
import ProductsContainer from './containers/ProductsContainer';
import CartContainer from './containers/CartContainer';
import NotFound from './NotFound';

class App extends Component{

  componentDidMount(){
    this.props.getProductsData();
  }

  render(){    
    return (
      <div>
      {/* className="d-flex" id="wrapper" */}
        <Router>   
        <SideBar data={this.props.dataReducer} />
        <Switch>       
            <Route exact
              path='/'
              render={(props) => <ProductsContainer data = {this.props.dataReducer} cartData={this.props.getCartData}/>}
            />
            <Route
              path='/cart'
              render={(props) => <CartContainer />}
            />
            <Route component={NotFound} />
          </Switch>
      </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    dataReducer : state.dataReducer.data ,
    getCartData : state.cartReducer
  };
};

const mapDispatchToProps = {
    getProductsData: getProductsData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);