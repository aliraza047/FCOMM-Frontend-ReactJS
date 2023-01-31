import {
    GET_ALL_BLOGS,
    GET_SINGLE_ORDER,
    CLEAR_BLOG_IMAGE,
    GET_ALL_USERS,
    GET_BLOG_IMAGE,
    GET_HOME_ALL_BLOGS,
    GET_ALL_ORDERS,
    SELECTED_PRODUCTS,
    GET_SINGLE_ORDER_TRACKING
} from 'redux/action/Action.Constant';

const initial_state = {
    all_orders: [],
    single_order: '',
    single_order_tracking:''
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {
                ...state,
                all_orders: action.payload
            };
        case GET_SINGLE_ORDER:
            return {
                ...state,
                single_order: action.payload
            };

        case GET_SINGLE_ORDER_TRACKING:
            return {
                ...state,
                single_order_tracking: action.payload
            };


        default:
            return state;
    }
}
