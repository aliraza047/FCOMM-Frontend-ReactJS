import { GET_ABOUT_US } from 'redux/action/Action.Constant';

const initial_state = {
    about_us: ''
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ABOUT_US:
            console.log('hhh',action.payload)
            return {
                ...state,
                about_us: action.payload
            };

        default:
            return state;
    }
}
