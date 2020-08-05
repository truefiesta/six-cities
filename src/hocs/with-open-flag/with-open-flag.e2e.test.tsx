import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import withOpenFlag from "./with-open-flag";

configure({
  adapter: new Adapter(),
});

const MockComponent = (props) => {
  const {isOpen, ids, onOpenStateToggle, onClose} = props;
  return (
    <ul className={isOpen ? `class-open` : `class-close`} onClick={() => onOpenStateToggle()}>
      <li id={ids[0]} onClick={() => onClose()}></li>
      <li id={ids[1]} onClick={() => onClose()}></li>
    </ul>);
};

MockComponent.propTypes = {
  ids: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenStateToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const MockComponentWrapped = withOpenFlag(MockComponent);

describe(`withOpenFlag`, () => {
  describe(`renders correctly`, () => {
    it(`with class-close`, () => {
      const ids = [`li-0`, `li-1`];
      const wrapper = mount(<MockComponentWrapped
        ids={ids}
      />);

      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );
    });

    it(`with class-open after click`, () => {
      const ids = [`li-0`, `li-1`];
      const wrapper = mount(<MockComponentWrapped
        ids={ids}
      />);

      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );

      const list = wrapper.find(`ul`);
      list.simulate(`click`);

      expect(wrapper.html()).toEqual(
          `<ul class="class-open"><li id="li-0"></li><li id="li-1"></li></ul>`
      );
    });

    it(`with class-close after second click`, () => {
      const ids = [`li-0`, `li-1`];
      const wrapper = mount(<MockComponentWrapped
        ids={ids}
      />);

      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );

      const list = wrapper.find(`ul`);
      list.simulate(`click`);

      expect(wrapper.html()).toEqual(
          `<ul class="class-open"><li id="li-0"></li><li id="li-1"></li></ul>`
      );

      list.simulate(`click`);
      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );
    });

    it(`with class-open after click on ul and with class-close after click on li`, () => {
      const ids = [`li-0`, `li-1`];
      const wrapper = mount(<MockComponentWrapped
        ids={ids}
      />);

      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );

      const list = wrapper.find(`ul`);
      list.simulate(`click`);

      expect(wrapper.html()).toEqual(
          `<ul class="class-open"><li id="li-0"></li><li id="li-1"></li></ul>`
      );

      const listItem = wrapper.find(`#li-1`);
      listItem.simulate(`click`);
      expect(wrapper.html()).toEqual(
          `<ul class="class-close"><li id="li-0"></li><li id="li-1"></li></ul>`
      );
    });
  });
});


