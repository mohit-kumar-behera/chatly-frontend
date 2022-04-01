import * as actionTypes from './action-types';

export const updateMessageContainer = messageObj => {
  return {
    type: actionTypes.MESSAGE_CONTAINER,
    payload: { messageObj },
  };
};
