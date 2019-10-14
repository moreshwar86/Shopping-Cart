import React from 'react'
import './App.css'

import { connect } from 'react-redux'
import { filters } from "./actions";
import { withRouter } from 'react-router-dom'

class SideBar extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activeSizes:{
        x:false,
        m:false,
        l:false,
        xl:false
      },
      price: 0
    }   
    this.sideBar = true;
  }

  changeBackground(e, p){
    this.setState({ 
      activeSizes: {                 
          ...this.state.activeSizes,
          [e]: !this.state.activeSizes[e]
        },
        price: p
      }, () => {
      this.callFun(this.state.activeSizes, this.state.price)
    })
  }

  handleSliderChange(event) {
     this.setState({
        price: event.target.value
      },
      () => {
        this.callFun(this.state.activeSizes, this.state.price)        
      }
    )
  }

  callFun(e, p){
    this.props.filters(e, p);
  }

  clearFilters(){
    this.setState({
        activeSizes:{
          x:false, m:false, l:false, xl:false
        },
        price: 0
      },
      () => {
        this.callFun(this.state.activeSizes, this.state.price)
      }      
    )
  }

  hideSideBar(){
    this.sideBar = false;
  }
  showSideBar(){
      this.sideBar = true;
  }

  redirectToProductList= () => {
    this.props.history.push(`/`)
  }

  render(){ 
    const {pathname} = this.props.location;
    
    if(pathname == '/cart'){
      this.hideSideBar();
    }else{
      this.showSideBar();
    }
    
    var size = this.props.data.sizes;
    var filterSize=[];
    
    for(var i in this.state.activeSizes){
      if(this.state.activeSizes[i] == true){
        filterSize.push(i);
      }
    }
    
    return(
        <>
        <div class="header">
          <a onClick={this.redirectToProductList} class="logo">Shopping cart</a>
          <div class="header-right">
            {/* <a class="active" href="#home">Home</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a> */}
          </div>
        </div>
        {this.sideBar != false &&
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading" style={{"font-weight" : "600"}}>Filters
              {(filterSize.length > 0 || this.state.price > 0) &&
                <div style={{"float": "right"}}>
                  <a href="#" onClick={()=>{this.clearFilters()}}>Clear All</a>
                </div>
              }
              {filterSize.length > 0 &&
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <div>
                      Sizes: 
                      {
                        filterSize.map(sz =>{
                          return <span class="breadcrumb-item"><a href="#"> {sz.toUpperCase()}</a></span>
                        }) 
                      }
                    </div>
                  </ol>
                </nav>
              }
              {this.state.price > 0 &&
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <div>
                      Price: <span class="breadcrumb-item"><a href="#"> {this.state.price}</a></span>
                    </div>
                  </ol>
                </nav>
              }
            </div>
            <div className="list-group list-group-flush">
            <div className="sidebar-heading">Size</div>
              <div className="list-group-item list-group-item-action bg-light">
                {size &&
                  size.map((sz) =>(
                    <span className={this.state.activeSizes[sz.toLowerCase()] ? "active sidebar-size" : "sidebar-size"} onClick={()=>{this.changeBackground(sz.toLowerCase(), this.state.price)}}>
                      {sz}
                    </span>
                  ))        
                } 
              </div>
              <div className="sidebar-heading">Price </div>
              <div className="list-group-item list-group-item-action bg-light">
                  <input type="range" defaultValue="0" min="0" max="100" className="slider" 
                    onChange={this.handleSliderChange.bind(this)} 
                    step="5" value={this.state.price}
                    data-toggle="tooltip" data-placement="bottom" title={this.state.price} />
                  
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}
const mapStateToProps = state => {
  return { dataReducer : state };
};

function mapDispatchToProps(dispatch) {
  return {
    filters: (size, price) => dispatch(filters(size, price)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));