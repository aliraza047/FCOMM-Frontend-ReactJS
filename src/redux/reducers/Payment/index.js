import { GET_ALL_PAYMENT, CLEAR_ALL_PAYMENT, GET_USER_PAYMENTS, GET_PAYMENT_BALANCE } from 'redux/action/Action.Constant';

const initial_state = {
    all_payments: [],
    user_payments: [],
    user_balance: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_PAYMENT:
            return {
                ...state,
                all_payments: action.payload
            };
        case GET_USER_PAYMENTS:
            return {
                ...state,
                user_payments: action.payload
            };
        case CLEAR_ALL_PAYMENT:
            return {
                ...state,
                all_payments: [  ]
            };
        case GET_PAYMENT_BALANCE:
            return {
                ...state,
                user_balance: action.payload
            };

        default:
            return state;
    }
}
