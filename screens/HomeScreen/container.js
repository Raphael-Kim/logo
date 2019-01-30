import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeScreen from "./presenter";
import { AppLoading, Font } from 'expo';

class Container extends React.PureComponent {
    static propTypes = {
        feed: PropTypes.array,
        getFeed: PropTypes.func.isRequired
    };

    data = [{key: 'a'}, {key: 'b'}]

    state = {
        isFetching: false,
        loaded: false, // for font
        visibleModal: false, //for modal screen(for asking)
        askContents: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        name: '최기환',
        userCode: '1',
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.feed) {
            this.setState({
                isFetching: false
            });
        }
    };

    componentWillMount(){
        this._loadAssetsAsync();
    }
    
    render() {
        console.log("container render");
        /* for font(start) */
        if(!this.state.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */
        
        return (
            <HomeScreen 
            {...this.props} 
            {...this.state}
            ask={this._ask} 
            refresh={this._refresh} 
            data={this.data}
            submit={this._submit}
             />
        );
    }

    _ask = () => {
        this.setState({ visibleModal: !this.state.visibleModal});
    };

    _submit = () => {
        this.setState({ visibleModal: !this.state.visibleModal});
        fetch('http://18.222.158.114:3210/askSubmit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                name: this.state.name,
                contents: this.state.askContents,
                userCode: this.state.userCode
            })
        });  
    };
    _refresh = () => {
        // const { getFeed } = this.props;
        this.setState({
            isFetching: true
        });
        // getFeed();
        this.data.push({key: 'c'});
        setTimeout(() => {
            this.setState({
                isFetching: false
            });
        }, 10000);
    };

    /*for font(start)*/
    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
            NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
            godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf')
        });
        this.setState({ loaded: true });
    };
    /*for font(end)*/
}

export default Container;