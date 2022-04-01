import * as actionTypes from './action-types';

const INITIAL_STATE = {
  user: null,
  afterRegisterToken: null,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action = null) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        afterRegisterToken: action.payload.token,
        isAuthenticated: true,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default userReducer;
