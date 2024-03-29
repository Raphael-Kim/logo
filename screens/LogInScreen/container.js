import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogInScreen from './presenter';
import { AuthSession } from 'expo';

const KAKAO_APP_KEY = 'fc03e1abe3af0aa5fcba490d726bb5b3'; 

class Container extends React.Component {
    static propTypes = {
        setToken: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        setUserProfile: PropTypes.func.isRequired,
        setLogIn: PropTypes.func.isRequired
    };

    render() {
        return (
            <LogInScreen 
                {...this.props} 
                kakaoLogIn={this._kakaoLogin}
            />
        );
    }

    // API Actions
    _kakaoLogin = async () => {
        /* ↓ [1단계] authorization_code 수령해오기 */         
        let redirectUrl = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
        authUrl:
            `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}` +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
            `&response_type=code`,
        });
        if (result.type !== 'success') {
            console.log(result.type);
            // this.setState({ didError: true });
        } else { 
            /* ↓ [2단계] access_token 및 refresh_token 수령
            ※ V_2(async&await 만으로 fetch를 구현, V_1은 보류file/kakaoAPI.js 하단에 有)
            ※ log 찍히는 순서: 1 → 2 → 3 */ 
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
                this.props.setToken(json);

                /* ↓ [3단계] 사용자 정보 요청(token 이용)
                ※ V_2(async&await 만으로 fetch를 구현, V_1은 보류file/kakaoAPI.js 하단에 有) */      
                try {
                    response = await fetch('https://kapi.kakao.com/v2/user/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${json.access_token}`,
                        }
                    });
                    json = await response.json();
                    this.props.setUser(json);

                    /* [4단계] DB와 대조(kakaoID 이용)
                    ※ V_2(async&await 만으로 fetch를 구현) */
                    try{
                        response = await fetch('http://18.222.158.114:3210/checkKakao', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                kakaoCode: json.id
                            })   
                        });
                        json = await response.json();

                        if(Object.keys(json).length === 0) {
                            /* [5.1단계] '회원정보 업데이트'로 이동
                            ※ → 회원가입이 아니라 '회원정보 업데이트'를 구현할 것! */
                            this.props.navigation.navigate('SignUp_Info'); 
                        } else {
                            /* [5.2단계] DB에서 userProfile(userCode, name) 받아와서 store(Redux)에 저장
                            ※ V_2(async&await 만으로 fetch를 구현) */
                            try{
                                // console.log(json[0]);
                                // console.log(json[0].kakaoCode);
                                response = await fetch('http://18.222.158.114:3210/fetchUserCode', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json;charset=UTF-8',
                                        'Content-Type': 'application/json;charset=UTF-8'
                                    },
                                    body: JSON.stringify({
                                        kakaoCode: json[0].kakaoCode         
                                    })
                                })
                                json = await response.json(); // Array [Object{'name': xxx, 'userCode': xxx,},]
                                this.props.setUserProfile(json[0]);
                                this.props.setLogIn();
                            }
                            catch(error) {
                                console.log('error_kakaoLogin(5단계)')
                            }
                        }
                    }
                    catch(error) {
                        console.log('error_kakaoLogin(4단계)');
                        // this.props.setLogIn(); → (for test)
                    }
                }
                catch(error) {
                    console.log('error_kakaoLogin(3단계)');
                }  
                // console.log(2);   
            }
            catch(error) {
                console.log('error_kakaoLogin(2단계)');
            }
            // console.log(3);
        }
    };
}

export default Container;