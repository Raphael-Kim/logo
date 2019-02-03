/* ↓ [?단계] access_token_info
※ V_2(async&await 만으로 fetch를 구현) */        
try{
    let response = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json;charset=UTF-8',
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${json.access_token}`,
        },
        // body: body
    });
    json = await response.json();
    console.log(json);
}
catch(error) {
    console.log('error');
}

/* [?단계] 사용자 정보 요청(token 이용)
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
    console.log(json);
    dispatch(setUser(json));
}
catch(error) {
    console.log('error');
}  

/* [?단계] DB와 대조(kakaoID 이용)
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
        navigation.navigate('SignUp1')
    } else {
        console.log(json);
        dispatch(setLogIn());
    }
}
catch(error){
    console.log('error');
}

/* [?단계] 토큰(token) 갱신
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
}
catch(error){
    console.log('error');
}

/* [?단계] 로그아웃
※ V_2(async&await 만으로 fetch를 구현, V_1은 LogInScreen/container.js에 有) */
try{
    let response = await fetch('https://kapi.kakao.com/v1/user/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${json.access_token}`
        },
    });
    json = await response.json();
}
catch(error){
    console.log('error');
}

/* ↓ V_1
※ log 찍히는 순서: 2 → 1 */
_handleKakaoLogIn = () => {
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
};

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
