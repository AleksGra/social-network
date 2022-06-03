import { SET_AUTH_DATA } from './actions';
import { chatApi } from '../../API/chat-api';

let initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEVIED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map( m => ({...m}))]
            .filter((m, index, array) => index >= array.length - 100)
      };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages) => ({
    type: 'chat/MESSAGES_RECEVIED',
    payload: { messages },
  }),
};
let _newMessageHandler = null;
const newMessageHandlerCreator = (dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = messages => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
export const startMessagesListening = () => async dispatch => {
  chatApi.start();
  chatApi.subscribe('messages-received',newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = () => async dispatch => {
  chatApi.unSubscribe('messages-received',newMessageHandlerCreator(dispatch));
  chatApi.stop();
};

export const sendMessage = (message)=>()=> {
  chatApi.sendMessage(message)
}

export default chatReducer;
