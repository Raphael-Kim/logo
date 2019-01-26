import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class ProfileScreen extends React.Component{

    render(){

        return(
        <View style={styles.container}>
        <ImageBackground style={{flex: 1}}source={require('../../assets/images/profileBack(x4).png')} resizeMode={'stretch'}>
            {/*전체 # 칸 중 1번째 칸, 로고가 들어가는 이미지칸*/}
            <View style={styles.contents1} >
                <View style={{flex: 1, marginLeft: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', marginTop: 5}}>
                {/* ↑ <ImageBackground>가 row direction이라고 할지라도, 그 child인 <View>는 column direction이다! */}
                    <Image 
                        source={require('../../assets/images/back(x4).png')}
                        style={{width: wp('5%') , height: wp('5%')}} 
                    />
                </View>
                <View style={styles.logoView}>
                    <Text style={styles.logo}>logo</Text>
                </View>
                <View style={{flex: 1, marginRight: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', alignItems: 'flex-end', marginTop: 5}}>
                    <Image 
                        source={require('../../assets/images/searchIcon(x4).png')}
                        style={{width: wp('5%') , height: wp('5%')}} 
                    />
                </View>
            </View>

            {/*전체 # 칸 중 2번째 칸, 프로필 이미지, 닉네임, 명언 들어가는 칸*/}
            <View style={styles.contents2}>
                <View style={styles.profileImgContainer}>
                <Image source={this.props.profileImg} style={styles.profileImg}></Image>
                </View>
                <Text>{this.props.nickName}</Text>
                <View style={styles.Line}></View>
                <Text>{this.props.famousSaying}</Text>
            </View>

            {/*전체 # 칸 중 3번째 칸, 랭킹이 들어가는 칸*/}
            <View style={styles.contents3}>
                
            </View>
        </ImageBackground>
        </View>
        );
    }
    
}

const styles = StyleSheet.create({
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
        fontSize: wp('12%'),
    },
    contents2: {
        height: hp('45%'), 
        width: wp('100%'),
        alignItems: 'center'
    },
    profileImgContainer: {
        marginTop: hp('5%'),
        height: hp('10%'),
        width: wp('10%'),
        //borderRadius: 40,
        overflow: 'hidden'
    },
    profileImg: {
        flex: 1,
        //borderRadius: 40,
    },
    Line:{
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginHorizontal: 125,
    },
    contents3: {
        height: hp('40%'), 
        width: wp('100%'),
    },
});

export default ProfileScreen;
