import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, StyleSheet } from 'react-native';
import { AppLoading, Font } from 'expo';
import LoggedOutNavigation from '../../navigation/LoggedOutNavigation';
import LoggedInNavigation from '../../navigation/LoggedInNavigation';

const KAKAO_APP_KEY = 'fc03e1abe3af0aa5fcba490d726bb5b3'; 

class RootContainer extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        token: PropTypes.object.isRequired,
        setToken: PropTypes.func.isRequired,
        setLogOut: PropTypes.func.isRequired
    };

    state = {
        isReady: false
    }

    /* ↓ <AppLoaing>(by expo)로 이동 
    componentDidMount() {
        this.checkTokenForKakao().then(() => {
            this.setState({ isReady: true }); // → onFinish
        }); // → startAsync
      
    }  */ 

    render() {
        const { isLoggedIn } = this.props;

        if(this.state.isReady === false) {
            return(
                <AppLoading 
                    autoHideSplash={false} // → 기본값(default)
                    startAsync={() => {
                        return Promise.all([this.checkTokenForKakao(), this.loadAssetsAsync()]);
                    }} // → 두 함수가 모두 Promise.resolve()되면 onFinish()가 실행됨
                    onFinish={() => this.setState({ isReady: true })}
                    onError={() => console.log('error_<AppLoading>')}
                />
            );
        } else {

            return(
                <View style={styles.container}>
                    <StatusBar hidden={false} />
                    {isLoggedIn ? (
                        // Home 화면으로 이동
                        <LoggedInNavigation/>
                    ) : (
                        // Login 화면으로 이동
                        <LoggedOutNavigation/>
                    )}
                </View>
            );
        }
    }

    /* ↓ for font */
    loadAssetsAsync = async () => {
        await Font.loadAsync({
            NanumSquareR: require('../../assets/fonts/NanumSquareR.ttf'),
            godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf')
        });
    };

    /* ↓ to check token for Kakao Session */
    checkTokenForKakao = async () => {
        /* ↓ [1단계] access_token_info
        ※ V_2(async&await 만으로 fetch를 구현) */ 
        try{
            console.log(this.props.token, 'from RootContainer/presenter.js');
            let response = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.props.token.access_token}`,
                }
            });
            var json = await response.json();
            // json = {code: -401}; (for test)
            // json = {code: 10}; (for test)
            // console.log(json, 'checkTokenForKakao(1단계)');

            if(json.code === -1) {
                /* [2.1단계] 카카오톡 서비스 장애 처리
                ※ V_2(async&await 만으로 fetch를 구현) */
                console.log('카카오톡의 일시적인 서비스 장애입니다!');
            }
            else if(json.code === -401) {
                /* [2.2단계] 토큰(token) 갱신
                ※ V_2(async&await 만으로 fetch를 구현) */
                try{
                    let body =
                    `grant_type=refresh_token` +
                    `&client_id=${KAKAO_APP_KEY}` +
                    `&refresh_token=${this.props.token.refresh_token}`;
                    // console.log(body); (for test)
                    let response = await fetch('https://kauth.kakao.com/oauth/token', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json;charset=UTF-8',
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        },
                        body
                    });
                    // console.log(response); (for test)
                    json = await response.json(); 
                    console.log(token, '기존의 token'); // (for test)
                    console.log(json, '갱신된 token(json)'); // (for test)
                    const newToken = {
                        ...this.props.token,
                        ...json
                    };
                    // console.log(newToken, '새로운 newToken'); (for test)
                    this.props.setToken(newToken);
                }
                catch(error){
                    console.log('error_checkTokenForKakao(2.2단계_토큰갱신)');
                    this.props.setLogOut();
                }
            } else if(json.code) { // → json.code 수정해야 함(0이면 문제가 발생) **
                /* [2.3단계] 로그아웃
                ※ V_2(async&await 만으로 fetch를 구현, V_1은 LogInScreen/container.js에 有) */
                // console.log(json.code);
                try{
                    response = await fetch('https://kapi.kakao.com/v1/user/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.props.token.access_token}`
                        },
                    });
                    json = await response.json();
                    this.props.setLogOut();
                }
                catch(error){
                    console.log('error_checkTokenForKakao(2.3단계_로그아웃)');
                }
            }
        }
        catch(error) {
            console.log('error_checkTokenForKakao(1단계)');
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

export default RootContainer;