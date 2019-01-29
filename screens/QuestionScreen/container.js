import React, { Component } from "react";
import ProfileScreen from "./presenter";
import { AppLoading, Font } from 'expo';

class Container extends Component {
    state = {
        loaded: false, // for font
        modalVisible: false,
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
        /* for font(start) */
        if(!this.state.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */
        
        return (
            <ProfileScreen 
            {...this.props} 
            {...this.state}
            />
        );
    }

    
    _loadAssetsAsync = async () => {
        await Font.loadAsync({
            NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
            godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf')
        });
        this.setState({ loaded: true });
    };
}

export default Container;