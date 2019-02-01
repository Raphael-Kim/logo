import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentScreen from "./presenter";
import {Font} from 'expo';

class Container extends Component {
    state={
        loaded: false,
        /* 폰트 로드 */
        Question: 'from 전 페이지',
        CommentContents: '',
        curTime: '',
        askContents: 'from 전 페이지'
    };

    componentDidMount(){
        setInterval( () => {
            this.setState({
              curTime : new Date().toLocaleString()
            })
          },1000)
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
            comment={this._Comment}
            submit={this._submit}
            />
        );
    }

    _Comment = (text) => {
        this.setState({
            CommentContents: text
        })
    };

    _submit = () => {
        fetch('http://18.222.158.114:3210/commentSubmit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                name: this.state.name,//내 이름
                userCode: this.state.userCode,//내 코드
                contents: this.state.CommentContents,//내가 단 답변 내용 
                datetime: this.state.curTime,//현 시간
                askCode2: this.state.askCode//내가 답변을 단 지문의 코드(질문을 받아오는 화면에서 질문 제목, 글쓴이 등의 정보와 함께 받아옴)
            })
        });
    }

}

export default Container;