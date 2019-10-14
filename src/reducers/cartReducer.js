import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from './../constants/index';
const initialState = {
    cartItem:[],
  };
  function getCartData(state = initialState, action) {
    switch (action.type) {

        case ADD_ITEM_TO_CART:
            var cart_item = state.cartItem;
            cart_item.push(action.payload);
          return{
                ...state.cartItem,
                cartItem: cart_item
            }

        case REMOVE_ITEM_FROM_CART:
            var cart_item = state.cartItem;
            cart_item = cart_item.filter(function( item ) {
                return item.id !== action.payload.id;
              });
          return{
                ...state.cartItem,
                cartItem: cart_item
            }
    
        default:
            return state
    }
  }  
export default getCartData;