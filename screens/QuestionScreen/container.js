import React, { Component } from "react";
import PropTypes from "prop-types";
import QuestionScreen from "./presenter";
import {Font} from 'expo';

class Container extends Component {
    state={
        loaded: false,
        /* 폰트 로드 */
        writer: '해당 글의 글쓴이 from DB',
        askContents: '해당 글 내용 from DB'
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
          <QuestionScreen 
            {...this.props} 
            {...this.state}
            />
        );
    }



}

export default Container;