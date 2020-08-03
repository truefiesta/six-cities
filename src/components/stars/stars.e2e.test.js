import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Stars from "./stars.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Stars`, () => {
  it(`calls onSelectedOptionChange on change`, () => {
    const onSelectedOptionChange = jest.fn();

    const starsComponent = mount(
        <Stars
          setName={`Rating`}
          setOptions={[`1`, `2`, `3`]}
          selectedOption={3}
          isBlocked={false}
          onSelectedOptionChange={onSelectedOptionChange}
        />
    );

    const input = starsComponent.find(`input`).at(0);

    input.simulate(`change`);
    expect(onSelectedOptionChange).toHaveBeenCalledTimes(1);
    expect(onSelectedOptionChange).toHaveBeenCalledWith(3);
  });
});
