import React from 'react';
import {ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {AppLoading, Font} from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-navigation';

class SignUpScreen_Info extends React.Component{

    render(){
        const {email} = this.props.email;
        const {name} = this.props.name;
        const {nickName} = this.props.nickName;

        /* for font(start) */
        if(!this.props.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */

    /* V_1
        return(
            <ImageBackground style={styles.container1} source={require('../../assets/images/SignUp2.png')} resizeMode={'stretch'}>
                    <View style={styles.contents1}>
                        <Image source={require('../../assets/images/logo_font.png')} />
                    </View>
            </ImageBackground>
        const {nickName} = this.props.nickName;
    */

    // V_2 ↓
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.contents1} source={require('../../assets/images/signUp(x4).png')} resizeMode={'stretch'}>
                    <View style={styles.logoView1}>
                        <Text style={styles.logo1}>logo</Text>
                    </View>
                    <View style={styles.logoLine}></View>
                    <View style={styles.logoView2}> 
                        <Text style={styles.logo2}>회 원 가 입</Text>
                    </View>
                </ImageBackground>

                {/*전체 3 칸 중 2번째 칸, 내용이 들어가는 칸*/}
                <KeyboardAvoidingView style={styles.contents2} keyboardVerticalOffset={Header.HEIGHT} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                        <TextInput 
                            style={styles.textInput1}
                            placeholder={'E-mail'}
                            returnKeyType={'done'}
                            keyboardType={'email-address'}
                            maxLength={35}
                            onChangeText={this.props.signUpEmail}
                            autoCorrect={false}
                            autoFocus={true}
                            value={name}/>
                        {this.props.checkEmail === true ? null:
                        <View style={styles.forNick}>
                            <Text style={styles.textNick}>이메일 형식에 맞지 않습니다!</Text> 
                        </View>}

                        <TextInput 
                            style={styles.textInput2}
                            placeholder={'이름'}
                            returnKeyType={'done'}
                            maxLength={6}
                            onChangeText={this.props.signUpName}
                            autoFocus={true}
                            autoCorrect={false}
                            value={name}/>

                        {/*닉네임으로 활동하시겠습니까 문구 및 props.yes,no 버튼 히든 관리, 위에서 이름을 칠 경우 hidden1 이 false가 되어 아래 부분이 보여짐*/}
                        {this.props.hidden1 === true ? null:
                        <View style={styles.forNick}>
                            <Text style={styles.textNick}>닉네임으로 활동하시겠습니까?</Text>
                            <TouchableOpacity 
                                onPress={this.props.yes}>
                                <Image source={this.props.yesImg}/>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={this.props.no}>
                                <Image source={require('../../assets/images/noLogin.png')}/>
                            </TouchableOpacity> 
                        </View>}
                        
                        {/*닉네임 입력칸 버튼 히든 관리, 위에서 props.yes를 클릭할 경우 hidden2 가 false가 되어 아래 부분이 보여짐*/}
                        {this.props.hidden2 === true ? null:
                        <View>
                            <View>
                                <TextInput
                                    style={styles.textInput2}
                                    placeholder={'닉네임'}
                                    returnKeyType={'done'}
                                    maxLength={8}
                                    onChangeText={this.props.signUpNickName}
                                    autoCorrect={false}
                                    autoFocus={true}
                                    value={nickName}/>
                            </View>    
                        </View>}
                        
                        {/*닉네임 확인 결과 알림 버튼 히든 관리, 현재는 위에서 로고를 클릭할 경우 hidden3 가 false 그 외의 경우 hidden4 가 false*/}
                        {this.props.hidden3 === true ? null:
                            <View style={styles.forNick}>
                                <Text style={styles.textNick2}>사용 가능한 닉네임입니다.</Text>
                            </View>}
                        {this.props.hidden4 === true ? null:
                            <View style={styles.forNick}>
                                <Text style={styles.textNick3}>이미 사용 중인 닉네임입니다.</Text>
                            </View>}
                        <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                    </View>
                </KeyboardAvoidingView>

                {/*전체 3 칸 중 3번째 칸, 화살표 버튼이 들어가는 칸*/}
                <View style={styles.contents3}>
                    <TouchableOpacity
                        onPress={this._onPressButton} 
                        disabled={this.props.leftState}>
                        {this.props.leftState === true ? 
                        <Image source={require('../../assets/images/leftBlock.png')}/>:
                        <Image source={require('../../assets/images/left.png')}/>}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {this.props.navigation.navigate('SignUp2',
                            {email: this.props.email, name: this.props.name, nickName: this.props.nickName});
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
    textNick2:{
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: '#009E19',
    },
    textNick3:{
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: '#F10000',
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

export default SignUpScreen1;