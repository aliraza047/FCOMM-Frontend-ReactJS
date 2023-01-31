import { GET_CHAT, GET_CONVERSATIONS, GET_NOTIFICATIONS } from 'redux/action/Action.Constant';

const initial_state = {
    all_conversations: [],
    chat_messages: []
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                all_conversations: action.payload
            };
        case GET_CHAT:
            return {
                ...state,
                chat_messages: action.payload
            };

        default:
            return state;
    }
}
