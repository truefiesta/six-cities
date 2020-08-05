import * as React from "react";
import * as renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withOpenFlag from "./with-open-flag";

const MockComponent = (props) => {
  const {isOpen} = props;
  const classType = isOpen ? `class-open` : `class-close`;

  return (
    <ul className={classType} />
  );
};

MockComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const MockComponentWrapped = withOpenFlag(MockComponent);

describe(`withOpenFlag`, () => {
  describe(`renders correctly`, () => {
    it(`when isOpen is false`, () => {
      const tree = renderer.create(
          <MockComponentWrapped/>).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

