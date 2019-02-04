import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpScreen_Agreement from "./presenter";

class Container extends React.Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        logIn: PropTypes.func.isRequired,
        setUserProfile: PropTypes.func.isRequired,
    };

    state={
        job: '',
        signUpState: true,
        check1: require('../../assets/images/beforeCheck.png'),
        check2: require('../../assets/images/beforeCheck.png'),
        check3: require('../../assets/images/beforeCheck.png'),
        check4: require('../../assets/images/beforeCheck.png'),
        fordb1: false,
        fordb2: false,
        fordb3: false
    };

    render() {

        return (
            <SignUpScreen_Agreement 
                {...this.props} 
                {...this.state} 
                fullCheck={this._fullCheck}
                checkAction1={this._checkAction1}
                checkAction2={this._checkAction2}
                checkAction3={this._checkAction3}
                submit={this._submit}/>
        );
    }

    _fullCheck = () => {
        if( this.state.check1 === require('../../assets/images/beforeCheck.png')){
            this.setState({
                check1: require('../../assets/images/afterCheck.png'),
                check2: require('../../assets/images/afterCheck.png'),
                check3: require('../../assets/images/afterCheck.png'),
                check4: require('../../assets/images/afterCheck.png'),
                fordb1: true,
                fordb2: true,
                fordb3: true,
                signUpState: false
            });
        } else {
            this.setState({
                check1: require('../../assets/images/beforeCheck.png'),
                check2: require('../../assets/images/beforeCheck.png'),
                check3: require('../../assets/images/beforeCheck.png'),
                check4: require('../../assets/images/beforeCheck.png'),
                fordb1: false,
                fordb2: false,
                fordb3: false,
                signUpState: true
            });
        }
    }

    _checkAction1 = () => {
        if(this.state.check2 === require('../../assets/images/beforeCheck.png')) {
            if(this.state.check3 === require('../../assets/images/afterCheck.png')) {
                this.setState({
                    check2: require('../../assets/images/afterCheck.png'), 
                    fordb1: true,
                    signUpState:false
                });
            } else {
                this.setState({
                    check2: require('../../assets/images/afterCheck.png'), 
                    fordb1: true,
                    signUpState: true
                });
            }
        } else {
            this.setState({
                check2: require('../../assets/images/beforeCheck.png'), 
                signUpState: true, 
                fordb1: false
            });
        }
    }

    _checkAction2 = () => {
        if(this.state.check3 === require('../../assets/images/beforeCheck.png')) {
            if(this.state.check2 === require('../../assets/images/afterCheck.png')) {
                this.setState({
                    check3: require('../../assets/images/afterCheck.png'), 
                    fordb2: true,
                    signUpState:false
                });
            } else {
                this.setState({
                    check3: require('../../assets/images/afterCheck.png'), 
                    fordb2: true,
                    signUpState: true
                });
            }
        } else {
            this.setState({
                check3: require('../../assets/images/beforeCheck.png'), 
                signUpState: true, 
                fordb2: false
            });
        }
    }

    _checkAction3 = () => {
        if(this.state.check4 === require('../../assets/images/beforeCheck.png')) {
            this.setState({
                check4: require('../../assets/images/afterCheck.png'), 
                fordb3: true
            });
        } else {
            this.setState({
                check4: require('../../assets/images/beforeCheck.png'), 
                fordb3: false
            });            
        }
    }

    submit = async () => {
        try{
            let response = await fetch('http://18.222.158.114:3210/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    email: this.props.navigation.state.params.email, 
                    name: this.props.navigation.state.params.name, 
                    check1: this.state.fordb1,
                    check2: this.state.fordb2,
                    check3: this.state.fordb3,
                    kakaoCode: this.props.navigation.state.params.kakaoCode,
                    kakaoImg: this.props.userInfo.properties.profile_image
                })
            });
            //console.log(response);
            try{
                response = await fetch('http://18.222.158.114:3210/fetchUserCode', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;charset=UTF-8',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        kakaoCode: this.props.navigation.state.params.kakaoCode                   
                    })
                })
                let json = await response.json();
                console.log(json[0]);
                this.props.setUserProfile(json[0]);
                this.props.logIn();
            }
            catch(error) {
                console.log('error_userCode')
            }
        }
        catch(error){
            console.log('error_submit');
        }
    }
}

export default Container;