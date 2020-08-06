import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withOpenFlag from "./with-open-flag";

configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const MockComponentWrapped = withOpenFlag(MockComponent);

describe(`withOpenFlag`, () => {
  it(`sets default isOpen to false`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    expect(wrapper.props().isOpen).toEqual(false);
  });

  it(`can toggle isOpen`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    wrapper.props().onOpenStateToggle();
    expect(wrapper.props().isOpen).toEqual(true);
    wrapper.props().onOpenStateToggle();
    expect(wrapper.props().isOpen).toEqual(false);
  });

  it(`can restore isOpen to false`, () => {
    const wrapper = shallow(<MockComponentWrapped/>);

    wrapper.props().onOpenStateToggle();
    expect(wrapper.props().isOpen).toEqual(true);
    wrapper.props().onClose();
    expect(wrapper.props().isOpen).toEqual(false);
  });
});


