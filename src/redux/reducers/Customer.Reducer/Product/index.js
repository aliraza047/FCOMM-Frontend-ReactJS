import {
    CLEAR_PRODUCTS_WEB,
    GET_ALL_PUBLIC_CATEGORIES,
    GET_HOME_ALL_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_BY_DESIGNER,
    GET_DESIGNER_DETAIL,
    GET_SEARCH_PARM,
    CLEAR_SEARCH_PARM
} from 'redux/action/Action.Constant';

const initial_state = {
    all_products_data: [],
    designer_products: [],
    designer_detail: {},
    all_categories_data: [],
    searchData: '',
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_HOME_ALL_PRODUCTS:
            return {
                ...state,
                all_products_data: action.payload
            };
        case GET_SEARCH_PARM:
            return {
                ...state,
                searchData: action.payload
            };
        case CLEAR_SEARCH_PARM:
            return {
                ...state,
                searchData: ''
            };

        case GET_PRODUCTS_BY_DESIGNER:
            return {
                ...state,
                designer_products: action.payload
            };
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                designer_products: action.payload
            };
        case GET_ALL_PUBLIC_CATEGORIES:
            return {
                ...state,
                all_categories_data: action.payload
            };
        case CLEAR_PRODUCTS_WEB:
            return {
                ...state,
                all_products_data: []
            };
        case GET_DESIGNER_DETAIL:
            return {
                ...state,
                designer_detail: action.payload
            };

        default:
            return state;
    }
}
