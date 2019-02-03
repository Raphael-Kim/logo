import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentScreen from "./presenter";

class Container extends Component {
    state={
        commentContents: ''
    };

    render() {
        return (
          <CommentScreen 
            {...this.props} 
            {...this.state}
            comment={this._comment}
            submit={this._submit}
            />
        );
    }

    _comment = (text) => {
        this.setState({
            commentContents: text
        })
    };

    _submit = async() => {
        try{
            let response = await fetch('http://18.222.158.114:3210/commentSubmit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.props.userProfile.name,
                    userCode: this.props.userProfile.userCode,
                    contents: this.state.commentContents,//내가 단 답변 내용 
                    datetime: '시간',//현 시간
                    askCode2: this.props.navigation.state.params.askCode//내가 답변을 단 지문의 코드(질문을 받아오는 화면에서 질문 제목, 글쓴이 등의 정보와 함께 받아옴)
                })
            });
            this.props.navigation.goBack();
        }
        catch(error){
            console.log('onEndReached_error');
        }        
    }

}

export default Container;