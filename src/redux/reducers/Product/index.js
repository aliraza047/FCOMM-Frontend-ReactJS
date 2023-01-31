import {
    ADD_VARIANT,
    ALL_PRODUCT_IMAGE,
    ALL_PRODUCT_VISUALIZATION_IMAGES,
    CLEAR_PRODUCTS_LISTING,
    CLEAR_PRODUCT_IMAGE,
    CLEAR_PRODUCT_REVIEWS,
    CLEAR_VARIANT,
    CLEAR_VARIANT_IMAGE,
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_NOT_APPROVED,
    GET_ALL_PRODUCTS_REVIEWS,
    GET_PRODUCT_REVIEWS,
    VARIANT_IMAGE,
    ALL_VISUAL_IMAGE,
    CLEAR_VISUAL_IMAGE,
    SET_VISUAL_PRODUCT_IMAGE,
    GET_PRODUCT_PRICE_RANGE
} from 'redux/action/Action.Constant';

const initial_state = {
    all_products: {},
    add_product: {},
    variant_image: [],
    variant_data: {},
    all_variant: [],
    product_image: [],
    visual_product_image: [],
    all_unapproved_products: [],
    all_products_reviews: [],
    all_products_with_reviews: [],
    all_visual_image: '',
    all_visual_product_image: [],
    product_price_range: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                all_products: action.payload
            };
        case GET_PRODUCT_PRICE_RANGE:
            return {
                ...state,
                product_price_range: action.payload
            };

        case ALL_VISUAL_IMAGE:
            return {
                ...state,
                all_visual_image: action.payload
            };
        case CLEAR_VISUAL_IMAGE:
            return {
                ...state,
                all_visual_image: '',
                all_visual_product_image: []
            };
        case SET_VISUAL_PRODUCT_IMAGE:
            return {
                ...state,
                all_visual_product_image: action.payload
            };

        case GET_PRODUCT_REVIEWS:
            return {
                ...state,
                all_products_reviews: action.payload
            };
        case GET_ALL_PRODUCTS_REVIEWS:
            return {
                ...state,
                all_products_with_reviews: action.payload
            };
        case GET_ALL_PRODUCTS_NOT_APPROVED:
            return {
                ...state,
                all_unapproved_products: action.payload
            };
        case VARIANT_IMAGE:
            return {
                ...state,
                variant_image: action.payload
            };
        case ALL_PRODUCT_IMAGE:
            return {
                ...state,
                product_image: action.payload
            };
        case ALL_PRODUCT_VISUALIZATION_IMAGES:
            return {
                ...state,
                visual_product_image: action.payload
            };
        case ADD_VARIANT:
            return {
                ...state,
                all_variant: action.payload
            };
        case CLEAR_VARIANT:
            return {
                ...state,
                all_variant: []
            };
        case CLEAR_VARIANT_IMAGE:
            return {
                ...state,
                variant_image: []
            };
        case CLEAR_PRODUCT_IMAGE:
            return {
                ...state,
                product_image: [],
                visual_product_image: []
            };
        case CLEAR_PRODUCTS_LISTING:
            return {
                ...state,
                all_products: []
            };
        case CLEAR_PRODUCT_REVIEWS:
            return {
                ...state,
                all_products_reviews: []
            };

        default:
            return state;
    }
}
