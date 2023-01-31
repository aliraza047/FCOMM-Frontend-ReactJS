import { GET_CART, GET_CART_PRICE } from 'redux/action/Action.Constant';

const initial_state = {
    cart_data: null,
    cart_price: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                cart_data: action.payload
            };
        case GET_CART_PRICE:
            return {
                ...state,
                cart_price: action.payload
            };
        default:
            return state;
    }
}
