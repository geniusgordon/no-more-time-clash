export const FB_LOGIN = 'FB_LOGIN';
export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';
export const FB_LOGIN_FAIL = 'FB_LOGIN_FAIL';
export const FB_LOGOUT = 'FB_LOGOUT';
export const REQUEST_PROFILE_PICTURE = 'REQUEST_PROFILE_PICTURE';
export const REQUEST_PROFILE_PICTURE_DONE = 'REQUEST_PROFILE_PICTURE_DONE';

export function requestProfilePictureDone(fbID, url) {
  return {
    type: REQUEST_PROFILE_PICTURE_DONE,
    fbID,
    url,
  };
}

export function fetchProfilePicture(fbID) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_PROFILE_PICTURE,
      fbID,
    });
    window.FB.api(`${fbID}/picture`, (response) => {
      if (response && !response.error) {
        dispatch(requestProfilePictureDone(fbID, response.data.url));
      }
    });
  };
}

export function fbLogin() {
  return (dispatch) => {
    dispatch({
      type: FB_LOGIN,
    });
    window.FB.login((response) => {
      if (response.authResponse) {
        const fbID = response.authResponse.userID;
        dispatch({
          type: FB_LOGIN_SUCCESS,
          fbID: response.authResponse.userID,
        });
        dispatch(fetchProfilePicture(fbID));
      } else {
        dispatch({
          type: FB_LOGIN_FAIL,
        });
      }
    });
  };
}

export function fbLogout() {
  return (dispatch) => {
    window.FB.logout(() => {
      dispatch({
        type: FB_LOGOUT,
      });
    });
  };
}

