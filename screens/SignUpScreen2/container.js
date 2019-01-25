import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen2 from "./presenter";

class Container extends Component {
    render() {
        return (
          <SignUpScreen2 {...this.props} {...this.state} />
        );
    }
}

export default Container;