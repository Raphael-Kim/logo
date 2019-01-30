import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentScreen from "./presenter";
import {Font} from 'expo';

class Container extends Component {
    state={
        loaded: false,
        /* 폰트 로드 */
    };

    componentWillMount(){
        this._loadAssetsAsync();
    }

    /* for font */
    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
          NanumSquareR: require('../../assets/fonts/NanumSquareR.ttf'),
          godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf'),
        });
        this.setState({ loaded: true });
    };

    render() {
        return (
          <CommentScreen 
            {...this.props} 
            {...this.state}
            />
        );
    }



}

export default Container;