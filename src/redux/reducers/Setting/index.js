import {
    CLEAR_SETTING_IMAGES,
    GET_ALL_USERS,
    GET_BANNER_IMAGE,
    GET_GALLERY,
    GET_SETTING,
    GET_SLIDER_IMAGE,
    GET_SOCIALS
} from 'redux/action/Action.Constant';

const initial_state = {
    setting: {},
    banner_image: [],
    slider_image: [],
    all_socials: [],
    all_gallery_images: [],
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_SETTING:
            return {
                ...state,
                setting: action.payload
            };
        case GET_BANNER_IMAGE:
            return {
                ...state,
                banner_image: action.payload
            };
        case GET_SLIDER_IMAGE:
            return {
                ...state,
                slider_image: action.payload
            };
        case GET_SOCIALS:
            return {
                ...state,
                all_socials: action.payload
            };
        case GET_GALLERY:
            return {
                ...state,
                all_gallery_images: action.payload
            };
        case CLEAR_SETTING_IMAGES:
            return {
                ...state,
                banner_image: [],
                slider_image: []
            };

        default:
            return state;
    }
}
