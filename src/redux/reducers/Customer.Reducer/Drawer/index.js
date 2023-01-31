import { OPEN_DRAWER, CLOSE_DRAWER } from '../../../action/Action.Constant';
const initial_state = {
    drawer_state: false
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case OPEN_DRAWER:
            return {
                ...state,
                drawer_state: true
            };
        case CLOSE_DRAWER:
            return {
                ...state,
                drawer_state: false
            };
        default:
            return state;
    }
}
