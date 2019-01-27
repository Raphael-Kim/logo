import React, { Component } from "react";
import PropTypes from "prop-types";
import ProfileScreen from "./presenter";
import { AppLoading, Font } from 'expo';
import { ImagePicker, Permissions } from 'expo';
import { CameraRoll } from 'react-native';

class Container extends Component {
    state = {
        isFetching: false,
        loaded: false, // for font
        profileImg: null,
        nickName: '리덕스에서 내 닉네임을 받아와야 함',
        famousSaying: 'Better the last smile than the first laughter',
        beforePick: true,
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
            />
        );
    }

    /*for font(start)*/
    _loadAssetsAsync = async () =>{
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
          base64: true,
        });
        // this gives you a rct-image-store URI or a base64 image tag that
        // you can use from ImageStore
        if (!result.cancelled) {
            this.setState({ profileImg: result.uri, beforePick: false });
            fetch('http://18.222.158.114:1219/changeProfileImg', {
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