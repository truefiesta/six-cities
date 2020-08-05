import * as React from "react";

const withOpenFlag = (Component) => {
  class WithOpenFlag extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._handleOpenStateToggle = this._handleOpenStateToggle.bind(this);
      this._handleComponentClose = this._handleComponentClose.bind(this);
    }

    _handleOpenStateToggle() {
      this.setState({isOpen: !this.state.isOpen});
    }

    _handleComponentClose() {
      this.setState({isOpen: false});
    }

    render() {
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onOpenStateToggle={this._handleOpenStateToggle}
          onClose={this._handleComponentClose}
        />
      );
    }
  }

  return WithOpenFlag;
};

export default withOpenFlag;
