import { GET_CONTACT_US } from 'redux/action/Action.Constant';

const initial_state = {
    details_contact_us: {}
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_CONTACT_US:
            return {
                ...state,
                details_contact_us: null
            };

        default:
            return state;
    }
}
