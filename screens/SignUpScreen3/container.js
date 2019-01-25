import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen3 from "./presenter";

class Container extends Component {
    render() {
        return (
          <SignUpScreen3 {...this.props} {...this.state} />
        );
    }
}

export default Container;