import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import SignIn from "./sign-in";

configure({
  adapter: new Adapter(),
});

describe(`SignIn`, () => {
  it(`calls onSubmit on submit`, () => {
    const onSubmit = jest.fn();

    const signInComponent = mount(
        <SignIn
          onSubmit={onSubmit}
        />
    );

    const {_loginRef} = signInComponent.instance();
    const {_passwordRef} = signInComponent.instance();

    const form = signInComponent.find(`form`);
    expect(form).toHaveLength(1);

    form.simulate(`submit`, {preventDefault() {}});
    expect(onSubmit).toHaveBeenCalledWith({login: _loginRef.current.value, password: _passwordRef.current.value});
  });
});
