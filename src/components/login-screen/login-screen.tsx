import * as React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getCity} from "../../reducer/filters/selectors";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AppRoute} from "../../const";
import Header from "../header/header";
import SignIn from "../sign-in/sign-in";
import CityLink from "../city-link/city-link";

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
