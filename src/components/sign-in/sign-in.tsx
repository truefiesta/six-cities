import * as React from "react";

interface Props {
  onSubmit: (obj: {login: string; password: string}) => void;
}

class SignIn extends React.PureComponent<Props, {}> {
  private _loginRef: React.RefObject<HTMLInputElement>;
  private _passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();

    onSubmit({
      login: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    });
  }

  render() {
    return (
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form
          className="login__form form"
          action="#"
          method="post"
          onSubmit={this._handleFormSubmit}
        >
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden" htmlFor="email">E-mail</label>
            <input
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              ref={this._loginRef}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden" htmlFor="password">Password</label>
            <input
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              ref={this._passwordRef}
            />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
    );
  }
}

export default SignIn;
