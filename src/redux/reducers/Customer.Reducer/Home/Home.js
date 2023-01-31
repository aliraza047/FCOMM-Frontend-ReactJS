import {
    CLEAR_SETTING_IMAGES,
    GET_ALL_USERS,
    GET_BANNER_IMAGE,
    GET_HOME_PAGE_DATA,
    GET_SETTING,
    GET_SLIDER_IMAGE
} from 'redux/action/Action.Constant';

const initial_state = {
    all_home_data: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_HOME_PAGE_DATA:
            return {
                ...state,
                all_home_data: action.payload
            };
        default:
            return state;
    }
}
