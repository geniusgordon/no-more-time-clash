export const FB_LOGIN = 'FB_LOGIN';
export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';
export const FB_LOGIN_FAIL = 'FB_LOGIN_FAIL';
export const FB_LOGOUT = 'FB_LOGOUT';

function getProfilePicture(userId, done) {
  window.FB.api(`${userId}/picture`, (response) => {
    if (response && !response.error) {
      done(response.data.url);
    }
  });
}

export function fbLogin() {
  return (dispatch) => {
    dispatch({
      type: FB_LOGIN,
    });
    window.FB.login((response) => {
      if (response.authResponse) {
        getProfilePicture(response.authResponse.userID, (url) => {
          dispatch({
            type: FB_LOGIN_SUCCESS,
            auth: response.authResponse,
            picture: url,
          });
        });
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

