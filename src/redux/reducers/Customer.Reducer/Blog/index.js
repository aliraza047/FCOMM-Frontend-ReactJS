import { GET_ALL_BLOGS, CLEAR_BLOG_IMAGE, GET_ALL_USERS, GET_BLOG_IMAGE, GET_HOME_ALL_BLOGS } from 'redux/action/Action.Constant';

const initial_state = {
    all_blogs_data: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_HOME_ALL_BLOGS:
            return {
                ...state,
                all_blogs_data: action.payload
            };

        default:
            return state;
    }
}
