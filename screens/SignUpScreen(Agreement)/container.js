import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen_Agreement from "./presenter";

class Container extends Component {
    render() {
        return (
          <SignUpScreen_Agreement {...this.props} {...this.state} />
        );
    }
}

export default Container;