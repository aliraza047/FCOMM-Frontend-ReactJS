import { GET_WISHLIST } from 'redux/action/Action.Constant';

const initial_state = {
    wishlist_data: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_WISHLIST:
            return {
                ...state,
                wishlist_data: action.payload
            };

        default:
            return state;
    }
}
