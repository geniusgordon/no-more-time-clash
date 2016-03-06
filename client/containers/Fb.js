import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/fb';

let Fb = ({ login, fbID, pictures, fbLogin, fbLogout }) => {
  if (login) {
    const url = pictures[fbID];
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={fbLogout}
        >Logout</button>
        <img src={url} />
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
  fbID: React.PropTypes.string,
  pictures: React.PropTypes.object,
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

