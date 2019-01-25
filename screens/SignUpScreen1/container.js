import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen1 from "./presenter";

class Container extends Component {
    render() {
        return (
          <SignUpScreen1 {...this.props} {...this.state} />
        );
    }
}

export default Container;