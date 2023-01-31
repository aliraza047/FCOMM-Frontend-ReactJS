import { GET_ALL_REWARDSS, GET_CURRENT_REWARD, REMOVE_CURRENT_REWARD, GET_ALL_REWARDS_TRACKING } from 'redux/action/Action.Constant';

const initial_state = {
    all_rewards: {},
    coupon_reward: '',
    rewards_tracking: ''
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_ALL_REWARDSS:
            return {
                ...state,
                all_rewards: action.payload
            };
        case GET_CURRENT_REWARD:
            return {
                ...state,
                coupon_reward: action.payload
            };
        case GET_ALL_REWARDS_TRACKING:
            return {
                ...state,
                rewards_tracking: action.payload
            };
        case REMOVE_CURRENT_REWARD:
            return {
                ...state,
                coupon_reward: ''
            };
        default:
            return state;
    }
}
