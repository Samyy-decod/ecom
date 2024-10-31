import { ADD_TO_CART , ADD_TO_CART_FAIL, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";




export const cartReducer = (state = { cartItems: [] ,shippingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:

        const item = action.payload //# jo itms aayge usko item s me store krege

        const isItemExist = state.cartItems.find(   //# chake items phele se card m ehe y anhi 
            (product)=>product.id === item.id
        )

        if(isItemExist){
            return {
                ...state,
                cartItems: state.cartItems.map((product)=> //$ agar kisi product ka id isItemExist.id ke barabar ho (yaani jo already cart mein hai), toh us product ko naye item ke saath replace kar do.
                    product.id ===isItemExist.id? item: product  //$Agar product ka id match nahi karta, toh product ko waise ka waise rakh lo
                )

            };
        }else{
            return {
                ...state,
                cartItems:[ ...state.cartItems,item] //# gar product nhi hephele se to card me items ko dal denge 

            };
        }

        case  REMOVE_CART_ITEM:
            return {
             ...state,
             cartItems: state.cartItems.filter((product)=> product.id !==action.payload)

            };
        case  SAVE_SHIPPING_INFO:
            return {
             ...state,
             shippingInfo: action.payload,
            };

    case  ADD_TO_CART_FAIL:
      return {
        ...state,
        error: action.payload,
      };

      

    default:
      return state;
  }
};
