import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthorizationStatus, getUserEmail} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const UNAUTHORIZED_USER = `Sign in`;

const Header = (props) => {
  const {authorizationStatus, email} = props;
  const userName = authorizationStatus === AuthorizationStatus.AUTH ? email : UNAUTHORIZED_USER;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{userName}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  email: getUserEmail(state),
});

export {Header};
export default connect(mapStateToProps, null)(Header);
