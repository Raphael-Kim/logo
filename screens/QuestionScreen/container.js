import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionScreen from './presenter';
import { AppLoading, Font } from 'expo';

class Container extends React.Component {
    static propTypes = {
        answerCard: PropTypes.array,
        getFeed: PropTypes.func
    };

    state={
        currentAnswerCode: '',
        askerKakaoImg: ''
    };

    componentWillMount(){
        this.init();
    };

    render() {
        return (
            <QuestionScreen 
                {...this.props} 
                {...this.state} 
                onEndReached={this._onEndReached} 
                keyExtractor={this._keyExtractor}
            />
        );
    }

    init = async( ) => {
        try{
            let response = await fetch('http://18.222.158.114:3210/FetchAskerImg', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    writerCode: this.props.navigation.state.params.writerCode // → askerCode
                })
            });
            var json = await response.json();
            await this.setState({askerKakaoImg: json[0].kakaoImg}); // → render_1

            try{
                let response = await fetch('http://18.222.158.114:3210/FetchNewAnswerCard', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        askCode: this.props.navigation.state.params.askCode
                    })
                });
                json = await response.json();
                
                // ↓ 답변이 존재하지 않는 경우
                if(json.length === 0) {
                    this.props.setAnswerCard(json);
                    return
                }
    
                await this.setState({currentAnswerCode: json.slice(-1)[0].answerCode}); // → render_2
                this.props.setAnswerCard(json); // → render_3
                // console.log(this.state.currentAskCode);
            }
            catch(error){
                console.log('error_init(2단계)');
            }
        }
        catch(error){
            console.log('error_init(1단계)');
        }
    }

    _onEndReached = async() => {
        try{
            let response = await fetch('http://18.222.158.114:3210/FetchOldAnswerCard', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentAnswerCode: this.state.currentAnswerCode,
                    askCode: this.props.navigation.state.params.askCode
                })
            });
            var json = await response.json();
            await this.setState({currentAnswerCode: json.slice(-1)[0].answerCode}); // → render_1
            this.props.addAnswerCard(json); // → render_2
            // await this.setState({currentAskCode: json[0].askCode}); 
            // console.log(this.state.currentAskCode);
        }
        catch(error){
            console.log('onEndReached_error');
        }        
    }

    _keyExtractor = (item, index) => {
        return item.answerCode.toString()
    };
    
}

export default Container;