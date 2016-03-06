import * as actions from '../actions/fb';

const initialState = {
  login: false,
  auth: null,
  picture: '',
};

const fbReducer = (state = initialState, action) => {
  if (action.type === actions.FB_LOGIN_SUCCESS) {
    return {
      login: true,
      auth: action.auth,
      picture: action.picture,
    };
  } else if (action.type === actions.FB_LOGOUT) {
    return {
      login: false,
      auth: null,
      picture: '',
    };
  } else if (action.type === actions.FB_LOGIN_FAIL) {
    return {
      login: false,
      auth: null,
      picture: '',
    };
  }
  return state;
};

export default fbReducer;

