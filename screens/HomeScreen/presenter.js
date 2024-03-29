import React, { Component } from 'react';
import { ImageBackground, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Easing, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from '../../circular-progress(RN)';
import Card from '../../components/Card(HomeScreen)';
import Modal from 'react-native-modal'; 
/* ↑ yarn add(sudo npm install --save) react-native-modal: @7.0.2 */
import { Header } from 'react-navigation';

class HomeScreen extends React.Component {

    render(){
        console.log('presenter render(HomeScreen)');
        const { profile_image } = this.props.userInfo.properties

        return(
            <View style={styles.container}>

                {/*전체 3 칸 중 1번째 칸, 로고가 들어가는 이미지칸*/}
                <ImageBackground style={styles.contents1} source={require('../../assets/images/home(x4).png')} resizeMode={'stretch'}>
                    <View style={{flex: 1, marginLeft: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', marginTop: 5}}>
                    {/* ↑ <ImageBackground>가 row direction이라고 할지라도, 그 child인 <View>는 column direction이다! */}
                        <Image 
                            source={require('../../assets/images/searchIcon(x4).png')} 
                            style={{width: wp('5%') , height: wp('5%')}} 
                        />
                    </View>
                    <View style={styles.logoView}>
                        <TouchableOpacity
                            onPress={() => {this.props.setLogOut();}}>
                            <Text style={styles.logo}>logo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, marginRight: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', alignItems: 'flex-end', marginTop: 5}}>
                        <AnimatedCircularProgress
                            ref={(ref) => this.circularProgress = ref}
                            size={wp('11%')}
                            width={wp('0.8%')}
                            fill={70}
                            lineCap={'round'}
                            // tintColor: stroke 색깔
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor='red'>
                            {
                                () => (
                                    <TouchableOpacity 
                                        onPress={() => {this.circularProgress.reAnimate(0, 70, 2000, Easing.quad);}}
                                        style={{width: '100%' , height: '100%'}}>{/* → style을 지정해야 <image>가 render()!*/}
                                    {/* ↑ 컴포넌트 사이에 ' '(space) 넣으면 에러 발생: <Text> 안에 작성하라고 */}
                                        <Image 
                                            source={{uri: `${profile_image}`}}
                                            style={{width: '100%' , height: '100%'}}/>
                                    </TouchableOpacity>
                                    )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </ImageBackground>

                {/*전체 3 칸 중 2번째 칸, 질문등록 버튼이 들어가는 칸*/}
                <View style={styles.contents2}>
                    <TouchableOpacity 
                        onPress={this.props.ask}>
                        <Image 
                            source={require('../../assets/images/upload(x4).png')}
                            style={{width: wp('90%') , height: hp('15%')}}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Modal 
                            isVisible={this.props.visibleModal}
                            avoidKeyboard={true} 
                            onBackdropPress={this.props.ask}>
                            <KeyboardAvoidingView style={styles.ask} keyboardVerticalOffset={Header.HEIGHT} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
                                <View style={styles.submitContents}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={'Describe your opinion or ask something to the other genius'}
                                        returnKeyType={'done'}
                                        maxLength={2000}
                                        multiline={true}
                                        onChangeText={this.props.contents}
                                        autoCorrect={false}
                                        autoFocus={true}
                                        value={this.props.askContents}/>
                                </View>
                                <TouchableOpacity onPress={this.props.submit} style={styles.submitButton}>
                                    <Text style={{ fontFamily: 'godoRoundedR', color: 'white', fontSize: wp('8%')}}>Submit</Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </Modal>
                    </View>
                </View>

                {/*전체 3 칸 중 3번째 칸, 질문등록 버튼이 들어가는 칸*/}
                <View style={styles.contents3}> 
                    <FlatList
                        data={this.props.askCard}
                        renderItem={({item}) => { 
                            if(item.key === 'a') {
                                return(
                                <View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: wp('5%'), marginBottom: hp('2%')}}>
                                        <Image 
                                                source={require('../../assets/images/ranking(x4).png')}
                                                style={{width: wp('5%') , height: wp('5%'), marginRight: wp('2%')}}
                                                resizeMode={'contain'}
                                        />
                                        <Text>
                                            광고(ad)
                                        </Text>
                                    </View>
                                    <View style={{alignItems: 'center', /* backgroundColor:'black' */}}>
                                        <Image 
                                        source={require('../../assets/images/ad(x4).png')}
                                        style={{width: wp('90%'), height: hp('15%'), marginBottom: hp('5%')}}
                                        resizeMode={'contain'}
                                        />
                                    </View>
                                </View>
                                );
                            } else {
                                return(<Card {...item}/>);
                            }
                        }}
                        refreshing={this.props.isFetching}
                        onRefresh={this.props.refresh}
                        onEndReachedThreshold={0.5}
                        onEndReached={this.props.onEndReached}
                        keyExtractor={this.props.keyExtractor}
                    />        
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
        fontSize: wp('10%'),
    },
    contents2: {
        flex: 2,
        // backgroundColor: 'blue',(for test)
        justifyContent: 'center',
        alignItems: 'center'
    },
    ask:{
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: hp('53%'),
        width: wp('90%')
    },
    submitContents:{
        height: hp('35%'),
        width: wp('75%'),
        borderRadius: 20,
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
        marginTop: 20
    },
    textInput:{
        marginTop: 10,
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
    },
    contents3: {
        flex: 10,
    }
});

export default HomeScreen;