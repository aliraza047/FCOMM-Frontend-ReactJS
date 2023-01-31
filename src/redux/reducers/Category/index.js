import { CLEAR_CATEGORY_IMAGE, GET_ALL_CATEGORIES, GET_ALL_USERS, GET_CATEGORY_IMAGE } from 'redux/action/Action.Constant';

const initial_state = {
    all_categories: {},
    category_image: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                all_categories: action.payload
            };
        case GET_CATEGORY_IMAGE:
            return {
                ...state,
                category_image: action.payload
            };
        case CLEAR_CATEGORY_IMAGE:
            return {
                ...state,
                category_image: null
            };

        default:
            return state;
    }
}
