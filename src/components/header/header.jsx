import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getAuthorizationStatus, getUserEmail} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {capitalize} from "../../utils.js";

const UNAUTHORIZED_USER = `Sign in`;

const Header = (props) => {
  const {authorizationStatus, email} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const userName = isAuthorized ? capitalize(email) : UNAUTHORIZED_USER;
  const page = isAuthorized ? AppRoute.FAVORITE : AppRoute.LOGIN;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoute.ROOT}
            >
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={page}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{userName}</span>
                </Link>
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
