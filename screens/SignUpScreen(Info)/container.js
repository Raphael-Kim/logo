import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen_Info from "./presenter";

class Container extends React.Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
    };

    state={
        email: '', // → 입력 받는 변수
        name: '', // → 입력 받는 변수
        yesImg: require('../../assets/images/beforeYes.png'), // → yes 이미지 변동 버튼 변수
        rightState: true, // → 왼쪽 오른쪽 화살표 누르기 가능 불가능 버튼
        data: [], // → 페치 데이터 받는 변수
        checkEmail: true, // → 이메일 체크 변수
    };

    async componentWillMount() {
        if(this.props.userInfo.kakao_account.is_email_verified === true) {
            if(this.props.userInfo.properties.nickname) {
                await this.setState({ 
                    name: this.props.userInfo.properties.nickname,
                    email: this.props.userInfo.kakao_account.email,
                    rightState: false
                });
            } else {
                await this.setState({
                    email: this.props.userInfo.kakao_account.email
                });                
            }
        }
    }

    render() {

        return (
          <SignUpScreen_Info 
            {...this.props} 
            {...this.state}
            signUpEmail={this._signUpEmail}
            signUpName={this._signUpName}
            />
        );
    }

    _signUpEmail = (text) => {
        this.setState({
            email: text
        }, () =>{
            if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(this.state.email)){
                this.setState({checkEmail: false});
            }else{
                this.setState({checkEmail: true});
            }
            if(this.state.checkEmail === true && this.state.name !== ''){
                this.setState({rightState: false});
              }else{
                this.setState({rightState: true});
            }
        });
      }
    
    _signUpName = (text) => {
        this.setState({
            name: text
        }, () =>{    
            if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]+$/.test(text)){
                if(this.state.checkEmail === true && this.state.name !== ''){
                    this.setState({rightState: false});
                }else{
                    this.setState({rightState: true});
                }
            }
        });
    }
}

export default Container;