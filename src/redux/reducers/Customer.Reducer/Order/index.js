import {
    GET_ALL_BLOGS,
    CLEAR_BLOG_IMAGE,
    GET_ALL_USERS,
    GET_BLOG_IMAGE,
    GET_HOME_ALL_BLOGS,
    GET_ALL_ORDERS,
    GET_ORDERS,
    SELECTED_PRODUCTS,
    GET_SHIPPING_DHL,
    REMOVE_SHIPPING_DHL
} from 'redux/action/Action.Constant';

const initial_state = {
    all_orders_data: [],
    all_selected_products: [],
    shipping_data: [],
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                all_orders_data: action.payload
            };

        case SELECTED_PRODUCTS:
            return {
                ...state,
                all_selected_products: action.payload
            };
        case GET_SHIPPING_DHL:
            return {
                ...state,
                shipping_data: action.payload
            };
        case REMOVE_SHIPPING_DHL:
            return {
                ...state,
                shipping_data: []
            };
        default:
            return state;
    }
}
