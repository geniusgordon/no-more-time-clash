import * as actions from '../actions/fb';

const initialState = {
  login: false,
  auth: null,
};

const fbReducer = (state = initialState, action) => {
  if (action.type === actions.FB_LOGIN_SUCCESS) {
    return {
      login: true,
      auth: action.auth,
    };
  } else if (action.type === actions.FB_LOGOUT) {
    return {
      login: false,
      auth: null,
    };
  } else if (action.type === actions.FB_LOGIN_FAIL) {
    return {
      login: false,
      auth: null,
    };
  }
  return state;
};

export default fbReducer;

