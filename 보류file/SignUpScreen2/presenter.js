import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { AppLoading } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-navigation'

class SignUpScreen2 extends React.Component{


    render(){
        /* for font(start) */
        if(!this.props.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */

        return(
            <View style={styles.container}>
                {/*전체 3 칸 중 1번째 칸, 로고가 들어가는 이미지칸*/}
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
                    {
                    // <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                    }
                    <View style={{flex: 1, /*backgroundColor: 'black'(for test)*/}}>    
                        <ScrollView contentInset={{bottom: Header.HEIGHT}}>
                        {
                        // ↑ scrollTo() 사용을 고려해볼 것: https://facebook.github.io/react-native/docs/scrollview#contentcontainerstyle
                        }
                            <Text style={styles.job}>직업</Text>
                            <View style = {styles.jobLine}/>
                            <View style={styles.jobs}>
                                <TouchableOpacity onPress={this.props.collegian}>
                                    <Text style={{fontFamily: 'NanumSquareR', fontSize: 13, color: this.props.color0}}>대학(원)생</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.etc1}>
                                    <Text style={{fontFamily: 'NanumSquareR', fontSize: 13, color: this.props.color1}}>직장인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.etc2}>
                                    <Text style={{fontFamily: 'NanumSquareR', fontSize: 13, color: this.props.color2}}>사업가</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.etc3}>
                                    <Text style={{fontFamily: 'NanumSquareR', fontSize: 13, color: this.props.color3}}>기타</Text>
                                </TouchableOpacity>
                            </View>

                            {this.props.hidden1 === true ? null:
                            <View>
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'학교명'}
                                    returnKeyType={'done'}
                                    maxLength={10}
                                    onChangeText={this.props.signUpSchool}
                                    autoCorrect={false}
                                    value={this.props.schoolName}
                                    />
                                {this.props.uniAuto === false ? this.props.uniAutoComplete : null}    
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'전공'}
                                    returnKeyType={'done'}
                                    maxLength={15}
                                    onChangeText={this.props.signUpMajor}
                                    autoCorrect={false}
                                    value={this.props.major}/>
                                {this.props.majorAuto === false ? this.props.majorAutoComplete : null}
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'이중(부)전공'}
                                    returnKeyType={'done'}
                                    maxLength={15}
                                    onChangeText={this.props.signUpSecondMajor}
                                    autoCorrect={false}
                                    value={this.props.secondMajor}/>
                                {this.props.majorAuto2 === false ? this.props.majorAutoComplete2 : null}
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'학번'}
                                    returnKeyType={'done'}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    onChangeText={this.props.signUpNumber}
                                    autoCorrect={false}
                                    value={this.props.schoolNumber}/>
                            </View>}

                            {/* 현재는 학번이 201403324 일 경우, 경고문구 뜨도록 설정 */}
                            {this.props.hidden2 === true ? null:  
                            <View>
                                <Text style={styles.forSchoolNumber}>이미 등록된 학번입니다.</Text>
                                <Text style={styles.forSchoolNumber2}>*누군가 나의 학번을 이용하고 있을 경우?</Text>
                                <Text style={styles.forSchoolNumber3}>자신의 학생증에서 이름, 사진, 학번 이외의 정보는 가리고</Text>
                                <Text style={styles.forSchoolNumber3}>사진을 찍어 heyum2017@gmail.com으로 보내주세요.</Text>        
                            </View>}

                            {this.props.hidden3 === true ? null:  
                            <View>
                                <Text style={styles.forEtc}>*비대학(원)생(직장인, 사업가, 기타)은 질문 등록만 가능합니다.</Text>       
                            </View>}
                        </ScrollView>
                    </View>
                    {
                    // <View style={{flex: 1, /*backgroundColor: 'white'(for test)*/}}></View>
                    }
                </KeyboardAvoidingView>

                {/*전체 3 칸 중 3번째 칸, 화살표 버튼이 들어가는 칸*/}
                <View style={styles.contents3}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('SignUp1');}} 
                        style={styles.left}>
                        <Image source={require('../../assets/images/left.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {this.props.navigation.navigate('SignUp3',{
                            email: this.props.navigation.state.params.email, 
                            name: this.props.navigation.state.params.name, 
                            nickName: this.props.navigation.state.params.nickName,
                            job: this.props.job,
                            schoolName: this.props.schoolName,
                            major: this.props.major,
                            secondMajor: this.props.secondMajor,
                            schoolNumber: this.props.schoolNumber,
                            });
                        }} 
                        disabled={this.props.rightState} 
                        style={styles.right} >
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
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) 
        // → flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
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
        marginTop: 10 // → logo1과 균형을 맞추기 위해서 부여한 값
    },
    logoLine:{
        borderBottomWidth: 1,
        borderBottomColor:'white',
        marginHorizontal: 125,
    },
    contents2: {
        flex: 6.3,
        // backgroundColor: 'blue',(for test)
        paddingHorizontal: 60,
        paddingTop: 20,
        // justifyContent: 'center' (내부에 <ScrollView> 1개만 들어가기 때문에 사용할 필요가 없음)
        // alignItems: 'center'(내부에서 <View> 컴포넌트를 사용하는 경우 주의할 것)
        // → flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    autocomplete:{
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
    },
    job:{
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
    },
    jobLine:{
        borderBottomWidth: 1,
        borderBottomColor:'#E5E5E5'
    },
    jobs:{
        flexDirection : 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'(여기서 딱히 할 필요가 없음)
        marginTop: 10,
    },
    textInput:{
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginTop: 25
    },
    forSchoolNumber:{
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: '#F10000',
        marginTop: 10
    },
    forSchoolNumber2:{
        fontFamily: 'NanumSquareR',
        fontSize: 10,
        color: '#292F6E',
        marginTop: 20
    },
    forSchoolNumber3:{
        fontFamily: 'NanumSquareR',
        fontSize: 10,
        color: '#292F6E',
        marginTop: 5
    },
    forEtc:{
        fontFamily: 'NanumSquareR',
        fontSize: 9,
        color: '#292F6E',
        marginTop: 5
    },
    contents3: {
        flex: 2.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        // backgroundColor: 'yellow'(for test)
    }
});

export default SignUpScreen2;