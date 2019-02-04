import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';
import { AppLoading, Font } from 'expo';

class Container extends React.Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        userProfile: PropTypes.object.isRequired,
        askCard: PropTypes.array.isRequired,
        setAskCard: PropTypes.func.isRequired,
        addAskCard: PropTypes.func.isRequired,
        setLogOut: PropTypes.func.isRequired
    };

    state = {
        isFetching: false,
        visibleModal: false, //for modal screen(for asking)
        askContents: '',
        curTime: '',
        currentAskCode: ''
    };

    /* ↓ 활용해서 코드 수정할 것 고려 必 
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.feed) {
            this.setState({
                isFetching: false
            });
        }
    }; */

    componentWillMount() {
        this.init();
    }

    render() {
        console.log('container render(HomeScreen)');
        
        return (
            <HomeScreen 
                {...this.props} 
                {...this.state} 
                refresh={this._refresh} 
                onEndReached={this._onEndReached} 
                keyExtractor={this._keyExtractor}
                ask={this._ask}
                submit={this._submit}
                contents={this._contents}
            />
        );
    }

    init = async( ) => {
        try{
            let response = await fetch('http://18.222.158.114:3210/FetchNewAskCard', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            var json = await response.json();
            // console.log(json);
            await this.setState({currentAskCode: json.slice(-1)[0].askCode}); // → render_1
            this.props.setAskCard(json); // → render_2
            if(this.state.isFetching === true) {
                this.setState({isFetching: false });
            }
            // await this.setState({currentAskCode: json[0].askCode}); 
            // console.log(this.state.currentAskCode);
        }
        catch(error){
            console.log('error_init');
        }
    }

    _onEndReached = async() => {
        try{
            let response = await fetch('http://18.222.158.114:3210/FetchOldAskCard', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentAskCode: this.state.currentAskCode
                })
            });
            var json = await response.json();
            await this.setState({currentAskCode: json.slice(-1)[0].askCode}); // → render_1
            this.props.addAskCard(json); // → render_2
            // await this.setState({currentAskCode: json[0].askCode}); 
            // console.log(this.state.currentAskCode);
        }
        catch(error){
            console.log('onEndReached_error');
        }        
    }

    _refresh = async () => {
        await this.setState({ isFetching: true });
        this.init();
    };

    _keyExtractor = (item, index) => {
        return item.askCode.toString()
    };

    _contents = (TEXT) => {
        this.setState({
            askContents : TEXT
        });
    };

    _ask = () => { // → 질문등록 버튼 누르면 모달(madal) 출력위해 작동
        this.setState({ 
            visibleModal: !this.state.visibleModal,
            askContents : ''
        });
    };

    _submit = () => { // → 질문등록 모달(madal)에서 제출
        this.setState({ 
            visibleModal: !this.state.visibleModal,
            curTime : new Date().toLocaleString()
        }, () => {
            fetch('http://18.222.158.114:3210/askSubmit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                    name: this.props.userProfile.name,
                    userCode: this.props.userProfile.userCode,
                    datetime: this.state.curTime,
                    contents: this.state.askContents,
                })
            });  
        });
    };

}

export default Container;