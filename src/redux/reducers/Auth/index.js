import { AUTH_USER, GET_MY_PROFILE, UPDATE_ROLE, USER_LOGOUT } from 'redux/action/Action.Constant';

const initial_state = {
    isAuthenticated: false,
    user: {},
    role: null
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case AUTH_USER:
            const { user } = action.payload;
            let rolle = user.role?.includes('admin')
                ? 'admin'
                : user.role?.includes('designer')
                ? 'designer'
                : user.role?.includes('manufacturer')
                ? 'manufacturer'
                : user.role?.includes('logistic')
                ? 'logistic'
                : 'user';
            console.log('Authenticated Role Reducer===>', rolle);

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                role: rolle
            };
        case UPDATE_ROLE:
            return {
                ...state,
                role: action.payload
            };

        case GET_MY_PROFILE:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                role: action.payload.user.role[0]
            };
        case USER_LOGOUT:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            };
            
        default:
            return state;
    }
}
