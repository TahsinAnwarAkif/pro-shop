import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM 
} from "../constants/Cart";

export const addRemoveCart = (state = {cartItems : []}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existedItem = state.cartItems.find(x => x.product === item.product);

            console.log(existedItem);
        
            if(existedItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existedItem.product ? item : x)
                };         
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };        
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state;
    }
}

export default addRemoveCart;