import React from 'react';
import {ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-navigation';

class SignUpScreen_Info extends React.Component{

    render(){
        const {email, name} = this.props;

    /* V_1
        return(
            <ImageBackground 
                style={styles.container1} 
                source={require('../../assets/images/SignUp2.png')} 
                resizeMode={'stretch'}>
                    <View style={styles.contents1}>
                        <Image source={require('../../assets/images/logo_font.png')} />
                    </View>
            </ImageBackground>
        const {nickName} = this.props.nickName;
    */

    // V_2 ↓
        return(
            <View style={styles.container}>
                <ImageBackground 
                    style={styles.contents1} 
                    source={require('../../assets/images/signUp(x4).png')} 
                    resizeMode={'stretch'}>
                    <View style={styles.logoView1}>
                        <Text style={styles.logo1}>logo</Text>
                    </View>
                    <View style={styles.logoLine}></View>
                    <View style={styles.logoView2}> 
                        <Text style={styles.logo2}>회 원 가 입</Text>
                    </View>
                </ImageBackground>

                {/*전체 3 칸 중 2번째 칸, 내용이 들어가는 칸*/}
                <KeyboardAvoidingView 
                    style={styles.contents2} 
                    keyboardVerticalOffset={Header.HEIGHT} 
                    behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                        <TextInput 
                            style={styles.textInput1}
                            placeholder={'E-mail'}
                            defaultValue={email}
                            returnKeyType={'done'}
                            maxLength={35}
                            onChangeText={this.props.signUpEmail}
                            autoCorrect={false}
                            value={email}
                            keyboardType={'email-address'}/>
                        {this.props.checkEmail === true ? null :
                        <View style={styles.forNick}>
                            <Text style={styles.textNick}>이메일 형식에 맞지 않습니다!</Text> 
                        </View>}
                        <TextInput 
                            style={styles.textInput2}
                            placeholder={'name'}
                            defaultValue={name}
                            returnKeyType={'done'}
                            maxLength={6}
                            onChangeText={this.props.signUpName}
                            autoCorrect={false}
                            value={name}/>
                        <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                    </View>
                </KeyboardAvoidingView>
                        
                {/*전체 3 칸 중 3번째 칸, 화살표 버튼이 들어가는 칸*/}
                <View style={styles.contents3}>
                    <TouchableOpacity
                        // onPress={}
                        disabled={true}
                        >
                        <Image source={require('../../assets/images/leftBlock.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate('SignUp_Agreement', {email, name, kakaoCode: this.props.userInfo.id});
                        }}
                        disabled={this.props.rightState}>
                        {this.props.rightState === true ? 
                        <Image source={require('../../assets/images/rightBlock.png')}/>:
                        <Image source={require('../../assets/images/right.png')}/>}
                    </TouchableOpacity>
                </View>
            </View>
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
        height: hp('40%'), 
        width: wp('100%'),
        // justifyContent: 'center'(사용안해도 내부에서 flex 활용 1:1 부여하기 때문에 문제 없음),
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    logoView1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor:'black'(for test)
    },
    logoView2: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor:'blue'(for test)
    },
    logo1: {
        fontFamily: 'godoRoundedR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('16%')
    },
    logo2: {
        fontFamily: 'NanumSquareR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('5%'),
        marginTop: 10 // logo1과 균형을 맞추기 위해서 부여한 값
    },
    contents2: {
        flex: 6.3,
        // backgroundColor: 'blue',(for test)
        paddingHorizontal: 60,
        // paddingVertical: 20,
        // justifyContent: 'center',
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    forNick: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        // backgroundColor: 'black',(fot test)
        alignItems: 'center'
    },
    textNick: {
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: '#292F6E',
    },
    contents3: {
        flex: 2.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'yellow',(for test)
        marginHorizontal: 40
    },
    textInput1:{
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    textInput2:{
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginTop: 25
    },
    logoLine:{
        borderBottomWidth: 1,
        borderBottomColor:'white',
        marginHorizontal: 125,
    }
});

export default SignUpScreen_Info;