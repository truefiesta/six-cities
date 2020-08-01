import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getCity} from "../../reducer/filters/selectors.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";
import CityLink from "../city-link/city-link.jsx";

const LoginScreen = (props) => {
  const {city, onUserLogIn, authorizationStatus} = props;
  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <SignIn
            onSubmit={onUserLogIn}
          />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <CityLink
                city={city}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

LoginScreen.propTypes = {
  city: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onUserLogIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUserLogIn(userCredentials) {
    dispatch(UserOperation.logIn(userCredentials));
  },
});

export {LoginScreen};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
