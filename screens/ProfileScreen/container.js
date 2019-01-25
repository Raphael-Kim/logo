import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileScreen from "./presenter";
import { AppLoading, Font } from "expo";

class Container extends Component {
    state = {
        isFetching: false,
        loaded: false, // for font
        profileImg: require(''),
        nickName: '리덕스에서 내 닉네임을 받아와야 함',
        famousSaying: 'Better the last smile than the first laughter',

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

    /*for font(start)*/
    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
            NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
            godoRoundedR: require("../../assets/fonts/godoRoundedR.ttf")
        });
        this.setState({ loaded: true });
    };
    /*for font(end)*/
}

export default Container;