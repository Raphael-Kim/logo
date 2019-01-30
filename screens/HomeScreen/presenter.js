import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Platform, TouchableOpacity, Easing, FlatList, KeyboardAvoidingView} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from '../../circular-progress(RN)';
import Card from '../../components/Card(feed)'
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import { Header } from 'react-navigation';

class HomeScreen extends React.Component {

    render(){
        console.log("presenter render");
        return(
        <View style={styles.container}>

            {/*전체 # 칸 중 1번째 칸, 로고가 들어가는 이미지칸*/}
            <ImageBackground style={styles.contents1} source={require('../../assets/images/home(x4).png')} resizeMode={'stretch'}>
                <View style={{flex: 1, marginLeft: 20, /*backgroundColor: 'black',(for test) */justifyContent: 'center', marginTop: 5}}>
                {/* ↑ <ImageBackground>가 row direction이라고 할지라도, 그 child인 <View>는 column direction이다! */}
                    <Image 
                        source={require('../../assets/images/searchIcon(x4).png')}
                        style={{width: wp('5%') , height: wp('5%')}} 
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
            </ImageBackground>

            {/*전체 # 칸 중 2번째 칸, 질문등록 버튼이 들어가는 칸*/}
            <View style={styles.contents2}>
                <TouchableOpacity 
                    onPress={this.props.ask}>
                    <Image 
                        source={require('../../assets/images/upload(x4).png')}
                        style={{width: wp('80%') , height: hp('15%')}}
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
                                    style={styles.textInput1}
                                    placeholder={'Describe your opinion or ask something to the other genius'}
                                    returnKeyType={'done'}
                                    maxLength={2000}
                                    multiline={true}
                                    onChangeText={this.props.askContents}
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

            <View style={styles.container2}> 
                <FlatList
                    data={this.props.data}
                    renderItem={({item}) => 
                        <Card key={item.key} text={item.key}/>
                    }
                    refreshing={this.props.isFetching}
                    onRefresh={this.props.refresh}
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: hp('40%'),
        width: wp('90%')
    },
    submitContents:{
        height: hp('35%'),
        width: wp('75%'),
        borderRadius: 20,
        borderColor: 'black',
        marginTop: 3
    },  
    submitButton:{
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: hp('7%'),
        width: wp('20%')
    },
    textInput1:{
        marginTop: 10,
        fontFamily: 'NanumSquareR', 
        fontSize: 18,
        color: 'black',
    },  
    textInput:{
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginTop: 25
    },
    container2: {
        flex: 10,
        alignItems: 'center'
    }, 
    contents3: {
        flex: 2,
        marginHorizontal: 40
    },
    contents4: {
        flex: 8,
        marginHorizontal: 40
    },
    content5: {
        flex: 30,
        marginHorizontal: 40,
        backgroundColor: 'black'
    },
    scroll: {
        backgroundColor: 'blue'
    }
});

export default HomeScreen;