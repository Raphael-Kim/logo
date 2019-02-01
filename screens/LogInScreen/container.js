import React, { Component } from "react";
import PropTypes from "prop-types";
import LogInScreen from "./presenter";
import { AuthSession } from 'expo';

const KAKAO_APP_KEY = 'fc03e1abe3af0aa5fcba490d726bb5b3'; 

class Container extends React.Component {
    static navigationOptions = ({ navigation }) => ({

    });

    state = {
        userInfo: null,
        didError: false
    };

    render() {
        return (
            <LogInScreen 
                {...this.props} 
                {...this.state} 
                kakaoLogIn={this.props.kakaoLogin}
                // handleKakaoLogOut={this._handleKakaoLogOut}
                // connetToKakao={this._connetToKakao}
                // disconnectToKakao={this._disconnectToKakao}
            />
        );
    }

}

export default Container;

/* V_1
    ※ log 찍히는 순서: 2 → 1
    let body =
    `grant_type=authorization_code` +
    `&client_id=${KAKAO_APP_KEY}` +
    `&code=${result.params.code}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: body
    })
    .then(response => {
        console.log(1)
        return response.json();
    })
    .then(json => {
        this.setState({ userInfo: json.access_token });
        console.log(this.state);
        this.props.navigation.navigate('SignUp1', {userInfo: this.state.userInfo});
    })
    .catch(error => {
        console.error(error);
    })
    console.log(2); 

    _handleKakaoLogIn = async () => {
        let redirectUrl = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
        authUrl:
            `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
            `&response_type=code`,
        });
        if (result.type !== 'success') {
            console.log(result.type);
            this.setState({ didError: true });
        } else { 
            /* V_2(async&await 만으로 fetch를 구현, V_1은 하단에 有)
            ※ log 찍히는 순서: 1 → 2 → 3  
            try {
                let body =
                `grant_type=authorization_code` +
                `&client_id=${KAKAO_APP_KEY}` +
                `&code=${result.params.code}` +
                `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
                let response = await fetch('https://kauth.kakao.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;charset=UTF-8',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: body
                });
                // console.log(1);
                let json = await response.json();
                console.log(json);
                await this.setState({ userInfo: json.access_token });
                // console.log(2);
                await this._connetToKakao();

                this.props.navigation.navigate('SignUp1', {userInfo: this.state.userInfo});
            }
            catch(error) {
                console.log(error);
            }
            // console.log(3);
        }
    };

    _handleKakaoLogOut = () => {
        fetch('https://kapi.kakao.com/v1/user/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.userInfo}`
            },
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.error(error);
        })
    };

    _connetToKakao = () => {
        fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.state.userInfo}`,
            },
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.error(error);
        })
    };

    _disconnectToKakao = () => {
        fetch('https://kapi.kakao.com/v1/user/signup', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.userInfo}`
            },
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.error(error);
        })
    };
*/ 