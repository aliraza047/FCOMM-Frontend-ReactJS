import {
    GET_NOTIFICATIONS
} from 'redux/action/Action.Constant';

const initial_state = {
    all_notifications: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                all_notifications: action.payload
            };

        default:
            return state;
    }
}
