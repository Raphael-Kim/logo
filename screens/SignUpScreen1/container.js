import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen1 from "./presenter";
import {Font} from 'expo';

class Container extends Component {
    state={
        loaded: false,
        /* 폰트 로드 */
        email: '',
        name: '',
        nickName: '',
        /*입력 받는 변수*/
        yesImg: require('../../assets/images/beforeYes.png'),
        /* yes 이미지 변동 버튼 변수 */
        leftState: true,
        rightState: true,
        /* 왼쪽 오른쪽 화살표 누르기 가능 불가능 버튼 */
        hidden1: true,
        /* 이름 입력시 하단에 텍스트와 예스 노우 버튼 출력 버튼 */
        hidden2: true,
        /* 닉네임 입력 칸 출려 버튼 */
        hidden3: true,
        /* 사용 가능 합니다 출력 */
        hidden4: true,
        /* 사용 불가능 합니다 출력 */
        data: [],
        /* 페치 데이터 받는 변수*/
        checkEmail: true,
        /* 이메일 체크 변수 */
        count: 0
        /* 입력 카운트 변수 */
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
          <SignUpScreen1 
            {...this.props} 
            {...this.state}
            signUpEmail={this._signUpEmail}
            signUpName={this._signUpName}
            signUpNickName={this._signUpNickName}
            yes={this._yes}
            no={this._no}
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
            if(this.state.checkEmail === true && this.state.name !== '' && this.state.nickName !== '' && this.state.hidden4 === true){
                this.setState({rightState: false});
              }else{
                this.setState({rightState: true});
            }
        });
      }
    
    _signUpName = (text) => {
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]+$/.test(text)){
            this.setState({
                name: text
            }, () =>{
                if(this.state.checkEmail === true && this.state.name !== '' && this.state.nickName !== '' && this.state.hidden4 === true){
                    this.setState({rightState: false});
                  }else{
                    this.setState({rightState: true});
                }
            });
            this.setState({
                hidden1: false
            });
        }
    }

    _signUpNickName = (text) => {
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]+$/.test(text)){
            this.setState({
                nickName: text
            }, () => {
                fetch('http://18.222.158.114:3210/searchNick', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            checkNick: this.state.nickName 
                    })   
                })
                .then(response => { return response.json(); })
                .then(responseData => {
                                          if(this.state.checkEmail === true && this.state.name !== '' && this.state.nickName !== ''){
                                            Object.keys(responseData).length === 0  ? this.setState({hidden3: false, hidden4: true, rightState: false}) : this.setState({hidden3: true, hidden4: false, rightState: true});
                                          }else{
                                            this.setState({rightState: true});
                                          }
                                      })
                if(this.state.nickName === ''){ 
                    this.setState({ hidden3: true, hidden4: true});
                }                      
            });
        } 
    }

    _yes = () => {
        this._onPressButton;
        this.setState({
            rightState: true,
            hidden2: false,
            yes: require('../../assets/images/yesLogin.png')
        });
    }

    _no = () => {
        this.setState({
            rightState: false,
            hidden2: true,
            hidden3: true,
            hidden4: true,
            yes: require('../../assets/images/beforeYes.png')
        });
        this.props.navigation.navigate('SignUp2', {email: this.props.email, name: this.props.name, nickName: this.props.nickName});
    }


}

export default Container;