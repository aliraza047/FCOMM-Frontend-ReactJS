import {
    GET_REPORT,
    GET_REPORT_OF_COM_ORDER,
    GET_REPORT_OF_CAN_ORDER,
    GET_REPORT_PRODUCT_ID,
    CLEAR_REPORT,
    GET_REPORT_BY_USERID,
    CLEAR_USER_REPORT,
    GET_DESIGNERS_PROFIT,
    GET_REPORT_SOLD_PRODUCTS
} from 'redux/action/Action.Constant';

const initial_state = {
    all_report: [],
    complete_order: [],
    cancel_order: [],
    product_report: {},
    user_report: [],
    designers_profit_report: [],
    sold_product_report: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_REPORT:
            return {
                ...state,
                all_report: action.payload
            };
        case GET_REPORT_PRODUCT_ID:
            return {
                ...state,
                product_report: action.payload
            };
        case GET_REPORT_OF_COM_ORDER:
            return {
                ...state,
                complete_order: action.payload
            };
        case GET_REPORT_SOLD_PRODUCTS:
            return {
                ...state,
                sold_product_report: action.payload
            };
        case GET_REPORT_OF_CAN_ORDER:
            return {
                ...state,
                cancel_order: action.payload
            };
        case GET_REPORT_BY_USERID:
            return {
                ...state,
                user_report: action.payload
            };
        case GET_DESIGNERS_PROFIT:
            return {
                ...state,
                designers_profit_report: action.payload
            };
        case CLEAR_USER_REPORT:
            return {
                ...state,
                user_report: []
            };
        case CLEAR_REPORT:
            return {
                ...state,
                all_report: []
            };
        default:
            return state;
    }
}
