import * as actionTypes from './action-types';

export const userLogin = ({ user, token }) => {
  return {
    type: actionTypes.LOGIN,
    payload: { user, token },
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
