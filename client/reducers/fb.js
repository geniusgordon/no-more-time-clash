import * as actions from '../actions/fb';

const initialState = {
  login: false,
  fbID: null,
  pictures: {},
};

const fbReducer = (state = initialState, action) => {
  if (action.type === actions.FB_LOGIN_SUCCESS) {
    return {
      login: true,
      fbID: action.fbID,
      pictures: state.pictures,
    };
  } else if (action.type === actions.FB_LOGOUT) {
    return {
      login: false,
      fbID: null,
      pictures: state.pictures,
    };
  } else if (action.type === actions.FB_LOGIN_FAIL) {
    return {
      login: false,
      fbID: null,
      pictures: state.pictures,
    };
  } else if (action.type === actions.REQUEST_PROFILE_PICTURE_DONE) {
    const p = {};
    p[action.fbID] = action.url;
    const pictures = Object.assign({}, state.pictures, p);
    return {
      login: state.login,
      fbID: state.fbID,
      pictures,
    };
  }
  return state;
};

export default fbReducer;

