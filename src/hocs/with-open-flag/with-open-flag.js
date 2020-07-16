import React, {PureComponent} from "react";

const withOpenFlag = (Component) => {
  class WithOpenFlag extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._handleComponentClick = this._handleComponentClick.bind(this);
      this._handleComponentChildClick = this._handleComponentChildClick.bind(this);
    }

    _handleComponentClick() {
      this.setState({isOpen: !this.state.isOpen});
    }

    _handleComponentChildClick() {
      this.setState({isOpen: false});
    }

    render() {
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onComponentClick={this._handleComponentClick}
          onComponentChildClick={this._handleComponentChildClick}
        />
      );
    }
  }

  return WithOpenFlag;
};

export default withOpenFlag;
