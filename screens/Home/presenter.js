import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, StatusBar, ActivityIndicator} from 'react-native';
import { AppLoading, Font } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Home extends React.Component{
    state={
        loaded: false,
    };

    componentWillMount(){
        this._loadAssetsAsync();
    }

    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
          NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
          godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf'),
        });
        this.setState({ loaded: true });
    };
    /*for font*/

    render(){

        /* for font(start) */
        if(!this.state.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */

        return(
            <View style={styles.container}>
                {/*전체 3 칸 중 1번째 칸, 로고가 들어가는 이미지칸*/}
                <ImageBackground style={styles.contents1} source={require('../../assets/images/SignUp.png')} resizeMode={'stretch'}>
                    <View style={styles.logoView}>                    
                        <TouchableOpacity onPress={this._onPressButton}>
                            <Image source={require('../../assets/images/search.png')}/>
                        </TouchableOpacity>
                        <Text style={styles.logo}>logo</Text>
                        <TouchableOpacity onPress={this._onPressButton}>
                            <Image source={require('../../assets/images/left.png')}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/*전체 3 칸 중 2번째 칸, 내용이 들어가는 칸*/}
                <View style={styles.contents2}>
                       
                </View>

                {/*전체 3 칸 중 3번째 칸, 화살표 버튼이 들어가는 칸*/}
                <View style={styles.contents3}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1
    },
    contents1: {
        height: hp('16%'), 
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoView: {
        flex: 1,
        marginTop: hp('7%')
    },
    logo: {
        fontFamily: 'godoRoundedR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('13%')
    },
    contents2: {
        height: hp('35%'), 
        padding: 30,  
        justifyContent: 'center'
    },
    contents3: {
        height: hp('49%'), 
        padding: 30
    }
});

export default Home;