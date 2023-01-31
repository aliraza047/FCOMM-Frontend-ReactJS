import { CLEAR_USER, GET_ALL_USERS, GET_DASHBOARD_DATA } from 'redux/action/Action.Constant';

const initial_state = {
    all_users: [],
    dashboard_data: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                all_users: action.payload
            };
        case GET_DASHBOARD_DATA:
            return {
                ...state,
                dashboard_data: action.payload
            };
        case CLEAR_USER:
            return {
                ...state,
                all_users: []
            };

        default:
            return state;
    }
}
