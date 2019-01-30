import React from 'react';
import {ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, Easing, ScrollView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {AppLoading, Font} from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-navigation';
import { AnimatedCircularProgress } from '../../circular-progress(RN)';

class QuestionScreen extends React.Component{

    render(){
        return(
            <ImageBackground style={styles.container} source={require('../../assets/images/QuestionScreen.png')} resizeMode={'stretch'}>
                <View style={styles.contents1}>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, /*backgroundColor: 'black',(for test) */alignItems: 'center', marginTop: 5}}>
                    {/* ↑ <ImageBackground>가 row direction이라고 할지라도, 그 child인 <View>는 column direction이다! */}
                        <Image 
                            source={require('../../assets/images/back(x4).png')}
                            style={{width: wp('5%') , height: wp('5%')}} 
                        />
                        <Image 
                            source={require('../../assets/images/searchIcon(x4).png')}
                            style={{width: wp('5%') , height: wp('5%'), marginLeft: 10}} 
                        />
                    </View>
                    <View style={styles.logoView}>
                        <Text style={styles.logo}>logo</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', alignItems: 'flex-end', marginTop: 5}}>
                        <TouchableOpacity 
                            onPress={() => {this.circularProgress.reAnimate(0, 70, 2000, Easing.quad);} }>
                            <AnimatedCircularProgress
                                ref={(ref) => this.circularProgress = ref}
                                size={wp('11%')}
                                width={wp('0.8%')}
                                fill={70}
                                lineCap={'round'}
                                // tintColor: stroke 색깔
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="red">
                                {
                                    () => (<Image 
                                                source={require('../../assets/images/suzi(x4).png')}
                                                style={{width: '100%' , height: '100%'}} 
                                            />)
                                }
                            </AnimatedCircularProgress>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.contents2}>
                    <View style={styles.profileImgContainer}>
                            <View style={styles.profileImg}></View>
                    </View>
                    <View style={styles.Questioner}>
                            <Text style={{fontFamily:'NanumSquareR', width: wp('8%'), color: 'white'}}>{this.props.writer}</Text>
                    </View>
                </View>

                <ScrollView style={styles.contents3}>
                    <Text style={{fontFamily:'NanumSquareR', width: wp('13%'), color: 'white'}}>{this.props.askContents}</Text>
                </ScrollView>

                <View style={styles.contents4}>
                </View>
            </ImageBackground>
        );

    }

}

const styles = StyleSheet.create({
    /* V_1
    container1: { 
     // 2019/01/19(expo_32.0.1)
     // RN <ImageBackground> Docs에 따르면, ImageBackground에서 height랑 width는 필수임
     // 하지만, height랑 width에 비율(%)을 설정(set)시 2번 중복 적용되는 버그(bug)를 발견
     // 따라서, (1) 비율(%) 대신 'react-native-responsive-screen'를 사용함
     // (2) resizeMode를 'contain'으로 설정시 잘리는 부분이 발생하므로, 'stretch'를 사용(비율 유지 X)
     // + resizeMode를 'cover'로 설정하는 것을 고려해볼 것
        height: hp('100%'), 
        width: wp('100%'),
    },
    contents1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    */
    container: { 
        flex: 1,
        // height: hp('100%'), 
        // width: wp('100%'),
    },
    contents1: {
        /* 2019/01/19(expo_32.0.1)
         * RN <ImageBackground> Docs에 따르면, ImageBackground에서 height랑 width는 필수임
         * 하지만, height랑 width에 비율(%)을 설정(set)시 2번 중복 적용되는 버그(bug)를 발견
         * 따라서, (1) 비율(%) 대신 'react-native-responsive-screen'를 사용함
         * (2) resizeMode를 'contain'으로 설정시 잘리는 부분이 발생하고 가운데 정렬되므로, 'stretch'를 사용(비율 유지 X)
         * + resizeMode를 'cover'로 설정하는 것을 고려해봤으나 -> 마찬가지로, 잘리거나 가운데 정렬됨
        */
        height: hp('15%'), 
        width: wp('100%'),
        flexDirection: 'row'
        // justifyContent: 'center'(사용안해도 내부에서 flex 활용 1:1 부여하기 때문에 문제 없음),
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    logoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'black'(for test)
    },
    logo: {
        fontFamily: 'godoRoundedR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('10%'),
    },
    contents2:{
        height: hp('15%'),
        width: wp('100%'),
        flexDirection: 'row'
    },
    profileImgContainer: {
        padding: wp('10%'),
        height: hp('15%'),
        width: wp('20%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    Questioner:{
        height: hp('15%'),
        width: wp('70%'),
        justifyContent: 'center'
    },
    contents3:{
        height: hp('15%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    contents4:{
        height: hp('55%'),
        width: wp('100%'),
    }
});

export default QuestionScreen;