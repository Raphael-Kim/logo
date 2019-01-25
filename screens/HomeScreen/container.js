import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeScreen from "./presenter";
import { AppLoading, Font } from 'expo';

class Container extends Component {
    static propTypes = {
        feed: PropTypes.array,
        getFeed: PropTypes.func.isRequired
    };

    state = {
        isFetching: false,
        loaded: false // for font
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
            <HomeScreen {...this.props} {...this.state} refresh={this._refresh} />
        );
    }

    _refresh = () => {
        const { getFeed } = this.props;
        this.setState({
            isFetching: true
        });
        getFeed();
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