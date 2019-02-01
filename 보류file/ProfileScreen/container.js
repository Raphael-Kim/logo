import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileScreen from "./presenter";
import { AppLoading, Font } from 'expo';
import { ImagePicker, Permissions } from 'expo'

class Container extends Component {
    state = {
        isFetching: false,
        loaded: false, // for font
        profileImg: null,
        nickName: 'From Redux',
        famousSaying: 'Better the last smile than the first laughter',
        beforePick: true,
        schoolImg: require('../../assets/images/school2.png'),
        levelImg: require('../../assets/images/level2.png'),
        rankingImg: require('../../assets/images/ranking2.png'),
        scoreImg: require('../../assets/images/score2.png'),
        answerImg: require('../../assets/images/answer2.png'),
        school: true,
        level: true,
        ranking: true,
        score: true,
        answer: true,
        myUni: 'From Redux',
        myMajor: 'FR',
        mySecondMajor: 'FR',
        myLevel: 'FR',
        myScore: 'FR',
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.feed) {
            this.setState({
                isFetching: false
            });
        } 
    };


    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                return Location.getCurrentPositionAsync({enableHighAccuracy: true});
            }
        }
    };
    /* ios, android cameraroll 접근 */

    componentWillMount(){
        this._loadAssetsAsync();
    }
    
    render() {
        /* for font(start) */
        if(!this.state.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */
        
        return (
            <ProfileScreen 
            {...this.props} 
            {...this.state}
            pickImage={this._pickImage}
            clickSchool={this._school}
            clickLevel={this._level}
            clickRanking={this._ranking}
            clickScore={this._score}
            clickAnswer={this._answer}
            />
        );
    }

    _school = () => {
        this.setState({ 
            schoolImg: require('../../assets/images/school.png'),
            levelImg: require('../../assets/images/level2.png'),
            rankingImg: require('../../assets/images/ranking2.png'),
            scoreImg: require('../../assets/images/score2.png'),
            answerImg: require('../../assets/images/answer2.png'),
            school: false,
            level: true,
            ranking: true,
            score: true,
            answer: true,
         });
    };

    _level = () => {
        this.setState({ 
            schoolImg: require('../../assets/images/school2.png'),
            levelImg: require('../../assets/images/level.png'),
            rankingImg: require('../../assets/images/ranking2.png'),
            scoreImg: require('../../assets/images/score2.png'),
            answerImg: require('../../assets/images/answer2.png'),
            school: true,
            level: false,
            ranking: true,
            score: true,
            answer: true,
         });
    };

    _ranking = () => {
        this.setState({ 
            schoolImg: require('../../assets/images/school2.png'),
            levelImg: require('../../assets/images/level2.png'),
            rankingImg: require('../../assets/images/ranking.png'),
            scoreImg: require('../../assets/images/score2.png'),
            answerImg: require('../../assets/images/answer2.png'),
            school: true,
            level: true,
            ranking: false,
            score: true,
            answer: true,
         });
    };

    _score = () => {
        this.setState({ 
            schoolImg: require('../../assets/images/school2.png'),
            levelImg: require('../../assets/images/level2.png'),
            rankingImg: require('../../assets/images/ranking2.png'),
            scoreImg: require('../../assets/images/score.png'),
            answerImg: require('../../assets/images/answer2.png'),
            school: false,
            level: true,
            ranking: true,
            score: false,
            answer: true,
         });
    };

    _answer = () => {
        this.setState({ 
            schoolImg: require('../../assets/images/school2.png'),
            levelImg: require('../../assets/images/level2.png'),
            rankingImg: require('../../assets/images/ranking2.png'),
            scoreImg: require('../../assets/images/score2.png'),
            answerImg: require('../../assets/images/answer.png'),
            school: true,
            level: true,
            ranking: true,
            score: true,
            answer: false,
         });
    };

    /*for font(start)*/
    _loadAssetsAsync = async () => {
        await Font.loadAsync({
            NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
            godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf')
        });
        this.setState({ loaded: true });
    };
    /*for font(end)*/

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 4],
          base64: true
        });
        // this gives you a rct-image-store URI or a base64 image tag that
        // you can use from ImageStore
        if (!result.cancelled) {
            this.setState({ profileImg: result.uri, beforePick: false });
            fetch('http://18.222.158.114:3210/changeProfileImg', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        img: result.base64
                })
            })
        }
    };
}

export default Container;