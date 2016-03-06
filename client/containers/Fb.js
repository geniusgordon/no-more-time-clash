import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/fb';

let Fb = ({ login, picture, fbLogin, fbLogout }) => {
  if (login) {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={fbLogout}
        >Logout</button>
        <img src={picture} />
      </div>
    );
  }
  return (
    <button
      className="btn btn-primary"
      onClick={fbLogin}
    >Login</button>
  );
};

Fb.propTypes = {
  login: React.PropTypes.bool,
  picture: React.PropTypes.string,
  fbLogin: React.PropTypes.func,
  fbLogout: React.PropTypes.func,
};

const mapStateToProps = (state) => state.fb;

const mapDispatchToProps = (dispatch) => ({
  fbLogin() {
    dispatch(actions.fbLogin());
  },
  fbLogout() {
    dispatch(actions.fbLogout());
  },
});

export default Fb = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fb);

