import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation';

class CommentScreen extends React.Component{

    render() {
        const { askTitle } = this.props.navigation.state.params;

        return(
            <View style={styles.container}>
                <ImageBackground 
                    style={styles.contents1} 
                    source={require('../../assets/images/CommentScreen.png')} 
                    resizeMode={'stretch'}>
                    <View style={styles.forlogo}>
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
                    <View style={{height: hp('10%'), width: wp('100%'), justifyContent: 'center', alignContent: 'center'}}>
                        <Text style={{fontFamily:'NanumSquareR', color: 'white', textAlign: 'center', fontSize: wp('5%')}}>"{askTitle}"</Text>
                    </View>
                </ImageBackground>

                <KeyboardAvoidingView 
                    style={styles.contents2} 
                    keyboardVerticalOffset={Header.HEIGHT} 
                    behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
                    <ScrollView style={styles.submitContents}>
                        <TextInput
                            style={styles.textInput1}
                            placeholder={'Describe your opinion'}
                            returnKeyType={'done'}
                            maxLength={2000}
                            multiline={true}
                            onChangeText={this.props.comment}
                            autoCorrect={false}
                            value={this.props.commentContents}/>
                            {/* keyboardawarescrollview 모듈을 다운 받아서 적용할까 말까. 텍스트가 스크롤 뷰 이상으로 치면 텍스트만 넘어가고 화면은 그 위치에 있음 */}
                    </ScrollView>
                    <View>
                        <TouchableOpacity onPress={this.props.submit} style={styles.submitButton}>
                            <Text style={{ fontFamily: 'godoRoundedR', color: 'white', fontSize: wp('5%')}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
        height: hp('25%'), 
        width: wp('100%'),
        // justifyContent: 'center'(사용안해도 내부에서 flex 활용 1:1 부여하기 때문에 문제 없음),
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    forlogo:{
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
    contents2:{
        height: hp('75%'),
        width: wp('100%'),
        alignItems: 'center'
    },
    submitContents:{
        height: hp('60%'),
        width: wp('90%'),
        borderColor: 'black',
        marginTop: 15
    },  
    submitButton:{
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: hp('7%'),
        width: wp('20%'),
        marginBottom: hp('5%'),
        marginTop: hp('3%')
    },
    textInput1:{
        marginTop: 10,
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
    },  
});

export default CommentScreen;