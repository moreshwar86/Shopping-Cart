import {GET_DATA, FILTERS, UPDATE_PRODUCTS_ITEMS} from './../constants/index';

 const initialState = {
    data: [],
    _data: [],
    sizes:[],
    filteredData:[],
  };

function getProductData(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return{
                ...state,
                data:{
                    ...action.payload,
                    products: action.payload.products,
                    sizes: action.payload.sizes
                },
                filteredData:{
                    ...action.payload,
                    products: action.payload.products,
                    sizes: action.payload.sizes
                },
            }

        case FILTERS:
            var k=[];
            var filterProducts=[];
            
            Object.keys(action.size).forEach(function(key) {
                if (action.size[key] == true) {
                    k.push(key);
                }
            });
            
            if(k.length > 0 && action.price > 0){
               for(let i=0; i<=k.length; i++){
                let kk = k[i];                
                state.filteredData.products.forEach(ele => {
                    ele.availableSizes.forEach(sz =>{
                        if(kk == sz.toLowerCase() && action.price >= ele.price){
                            filterProducts.push(ele);
                        }
                    })
                });
               }
            } else if(k.length > 0){
                for(let i=0; i<=k.length; i++){
                    let kk = k[i];
                    state.filteredData.products.forEach(ele => {
                        ele.availableSizes.forEach(sz =>{
                            if(kk == sz.toLowerCase()){
                                filterProducts.push(ele);
                            }
                        })
                    });
                }   
            }else if(action.price > 0){
                state.filteredData.products.forEach(ele => {
                    if(action.price >= ele.price){
                        filterProducts.push(ele);
                    }
                });
            }else{
                filterProducts.push(...state.filteredData.products);
            }

            var newArray = [];
            var lookupObject  = {};
       
            for(var i in filterProducts) {
               lookupObject[filterProducts[i]['id']] = filterProducts[i];
            }
       
            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }

            return{
                ...state,
                data:{
                    ...state.data,
                    products: newArray,
                    sizes: state.data.sizes
                }      
            }

        case UPDATE_PRODUCTS_ITEMS:
            state.data.products.map((p, index) =>{
                if(action.payload.id == p.id){
                    p.inCart = action.payload.inCart;
                    p.quantityInCart = action.payload.quantityInCart;
                }
            })
                
            return{
                ...state,
                data:{
                    ...state.data,
                    products: state.data.products,
                    sizes: state.data.sizes
                }      
            }

        default:
            return state
    }
}
  
export default getProductData