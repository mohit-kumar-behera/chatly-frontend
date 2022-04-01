import * as actionTypes from './action-types';

const updateMessageReducer = (state = {}, action = null) => {
  switch (action.type) {
    case actionTypes.MESSAGE_CONTAINER:
      let thisRoomMessages = state[action.payload.messageObj.toRoom] ?? [];

      const foundMsgIndex = thisRoomMessages.findIndex(
        message => message.id === action.payload.messageObj.id
      );

      if (foundMsgIndex !== -1) return state;

      return {
        ...state,
        [action.payload.messageObj.toRoom]: [
          ...thisRoomMessages,
          action.payload.messageObj,
        ],
      };
    default:
      return state;
  }
};

export default updateMessageReducer;
