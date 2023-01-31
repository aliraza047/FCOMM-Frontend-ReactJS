import { GET_ALL_BLOGS, CLEAR_BLOG_IMAGE, GET_ALL_USERS, GET_BLOG_IMAGE } from 'redux/action/Action.Constant';

const initial_state = {
    all_blogs: {},
    blog_image: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return {
                ...state,
                all_blogs: action.payload
            };
        case GET_BLOG_IMAGE:
            return {
                ...state,
                blog_image: action.payload
            };
        case CLEAR_BLOG_IMAGE:
            return {
                ...state,
                blog_image: null
            };

        default:
            return state;
    }
}
