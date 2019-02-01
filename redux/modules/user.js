// To save the profile of the user


// Imports
import { AuthSession } from 'expo';

const KAKAO_APP_KEY = 'fc03e1abe3af0aa5fcba490d726bb5b3'; 

// Actions
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

// Action Creators
function setLogIn(token) {
    return {
        type: LOG_IN,
        token
    };
}

function setLogOut(token) {
    return {
        type: LOG_OUT,
        token
    };
}

// API Actions
function kakaoLogin(navigation) {
    return async dispatch => {
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
                dispatch(setLogIn(json));
                navigation.navigate('SignUp1');
                // console.log(2);   
            }
            catch(error) {
                console.log(error);
            }
            // console.log(3);
        }
    };
}

function connectToKakao(navigation, json) {
    return async dispatch => {
        fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${json.access_token}`,
            },
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch(setLogIn(json));
            console.log(json);
            navigation.navigate('SignUp1');
        })
        .catch(error => {
            console.error(error);
        })
    }
};

// Initial State

const initialState = {
    isLoggedIn: false
} 

// Reducer

function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
        case LOG_IN:
            return applyLogIn(state, action);
        case LOG_OUT:
            return applyLogOut(state, action);
    }
}

function applyLogIn(state, action) {
    const { token } = action;
    return {
        ...state,
//        isLoggedIn: true,
        token
    };
}

function applyLogOut(state, action) {
    const { token } = action;
    return {
        ...state,
        isLoggedIn: false,
        token
    };
}

// Exports
const actionCreators = {
    setLogIn,
    setLogOut,
    kakaoLogin
};

export { actionCreators };

export default reducer;