import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {getCity} from "../../reducer/filters/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

const LoginScreen = (props) => {
  const {city, onUserLogIn} = props;

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
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

LoginScreen.propTypes = {
  city: PropTypes.string.isRequired,
  onUserLogIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUserLogIn(userCredentials) {
    dispatch(UserOperation.logIn(userCredentials));
  }
});

export {LoginScreen};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
