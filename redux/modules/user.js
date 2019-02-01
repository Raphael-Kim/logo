// To save the profile of the user

// Imports
import { AuthSession } from 'expo';

const KAKAO_APP_KEY = 'fc03e1abe3af0aa5fcba490d726bb5b3'; 

// Actions
const SET_TOKEN = 'SET_TOKEN'
const SET_USER = 'SET_USER'
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'


// Action Creators
function setToken(token) {
    return {
        type: SET_TOKEN,
        token
    };
}

function setUser(user) {
    return {
        type: SET_USER,
        user
    };
}

function setLogIn() {
    return {
        type: LOG_IN
    };
}

function setLogOut() {
    return {
        type: LOG_OUT
    };
}

// API Actions
function kakaoLogin(navigation) {
    return async (dispatch, getState) => {
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
            ※ V_2(async&await 만으로 fetch를 구현, V_1은 LogInScreen/container.js 하단에 有)
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
                var json = await response.json();
                dispatch(setToken(json));

                /* ↓ [3단계] 사용자 정보 요청(token 이용)
                ※ V_2(async&await 만으로 fetch를 구현, V_1은 LogInScreen/container.js에 有) */      
                try {
                    // const { user: { token } } = getState(); ↑ 위에 변수형을 var로 변경
                    let response = await fetch('https://kapi.kakao.com/v2/user/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${json.access_token}`,
                        }
                    });
                    json = await response.json();
                    dispatch(setUser(json));

                    /* [4단계] DB와 대조(kakaoID 이용)
                    ※ V_2(async&await 만으로 fetch를 구현) */
                    try{
                        let response = await fetch('http://18.222.158.114:3210/checkKakao', {
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
                            navigation.navigate('SignUp1'); // 회원가입이 아니라 '회원정보 업데이트'를 구현할 것!
                        } else {
                            dispatch(setLogIn());
                        }
                    }
                    catch(error) {
                        console.log('error');
                    }
                }
                catch(error) {
                    console.log('error');
                }  
                // console.log(2);   
            }
            catch(error) {
                console.log('error');
            }
            // console.log(3);
        }
    };
}

function checkTokenForKakao() {
    return async (dispatch, getState) => {
        /* ↓ [1단계] access_token_info
        ※ V_2(async&await 만으로 fetch를 구현) */        
        const { user: { token } } = getState();
        try{
            let response = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.access_token}`,
                }
            });
            var json = await response.json();
            // json = {code: -401}; (for test)
            json = {code: 0}; // logOut 시키기 위해서

            if(json.code === -1) {
                console.log('카카오톡의 일시적인 서비스 장애입니다!');
            }
            else if(json.code === -401) {
                /* [2단계] 토큰(token) 갱신
                ※ V_2(async&await 만으로 fetch를 구현) */
                try{
                    let body =
                    `grant_type=refresh_token` +
                    `&client_id=${KAKAO_APP_KEY}` +
                    `&refresh_token=${token.refresh_token}`;
                    let response = await fetch('https://kauth.kakao.com/oauth/token', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json;charset=UTF-8',
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        },
                        body
                    });
                    json = await response.json(); 
                    // console.log(token, '기존의 token'); (for test)
                    // console.log(json, '갱신된 token(json)'); (for test)
                    const newToken = {
                        ...token,
                        ...json
                    };
                    // console.log(newToken, '새로운 newToken'); (for test)
                    dispatch(setToken(newToken));
                }
                catch(error){
                    console.log('error');
                }
            } else if (json.code) {
                /* [2단계] 로그아웃
                ※ V_2(async&await 만으로 fetch를 구현, V_1은 LogInScreen/container.js에 有) */
                try{
                    let response = await fetch('https://kapi.kakao.com/v1/user/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${json.access_token}`
                        },
                    });
                    json = await response.json();
                    dispatch(setLogOut());
                }
                catch(error){
                    console.log('error');
                }
            }
        }
        catch(error) {
            console.log('error');
        }
    };
}

// Initial State
const initialState = {
    isLoggedIn: false
} 

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
        case SET_TOKEN:
            return applySetToken(state, action);
        case LOG_IN:
            return applyLogIn(state, action);
        case SET_USER:
            return applySetUser(state, action);
        case LOG_OUT:
            return applyLogOut(state, action);
    };
}

function applySetToken(state, action) {
    const { token } = action;
    return {
        ...state,
        token
    };
}

function applySetUser(state, action) {
    const { user } = action;
    return {
        ...state,
        user
    };
}

function applyLogIn(state, action) {
    return {
        ...state,
        isLoggedIn: true
    };
}

function applyLogOut(state, action) {
    return {
        ...state,
        isLoggedIn: false
    };
}

// Exports
const actionCreators = {
    kakaoLogin,
    checkTokenForKakao
};

export { actionCreators };

export default reducer;