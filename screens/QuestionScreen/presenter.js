import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, Easing, FlatList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from '../../circular-progress(RN)';
import Card from '../../components/Card(QuestionScreen)'

class QuestionScreen extends React.Component{

    render(){
        const { profile_image } = this.props.userInfo.properties;
        const { askerKakaoImg } = this.props;

        const { askCode } = this.props.navigation.state.params;
        const { askTitle } = this.props.navigation.state.params;
        const { name } = this.props.navigation.state.params;
        const { datetime } = this.props.navigation.state.params;  

        return(
            <ImageBackground style={styles.container} source={require('../../assets/images/questionScreen(x4).png')} resizeMode={'cover'}>
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
                                () => (
                                    <TouchableOpacity 
                                        onPress={() => {this.circularProgress.reAnimate(0, 70, 2000, Easing.quad);}}
                                        style={{width: '100%' , height: '100%'}}>{/* → style을 지정해야 <image>가 render()! */}
                                    {/* ↑ 컴포넌트 사이에 ' '(space) 넣으면 에러 발생: <Text> 안에 작성하라고 */}
                                        <Image 
                                            source={{uri: `${profile_image}`}}
                                            style={{width: '100%' , height: '100%'}}/>
                                    </TouchableOpacity>
                                    )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </View>

                <View style={styles.contents2}>
                    {!askerKakaoImg ? null :
                    <Image source={{uri: `${askerKakaoImg}`}} style={styles.profileImage}/>}
                    <View style={styles.profileText}>
                        <ScrollView>
                            <Text style={styles.QuestionerName}>{name}님의 질문</Text>
                            <Text style={styles.askTitle}>"{askTitle}"</Text>          
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.contents3}>
                    <FlatList
                        data={this.props.answerCard}
                        renderItem={({item}) => { 
                            return(<Card {...item}/>);
                        }}
                        onEndReachedThreshold={0.5}
                        onEndReached={this.props.onEndReached}
                        keyExtractor={this.props.keyExtractor}
                        horizontal={true}
                        contentContainerStyle={{alignItems: 'center'}}
                    />        
                </View>

                <View style={styles.contents4}>
                    <TouchableOpacity 
                        onPress={() => {this.props.navigation.navigate('Comment', {askCode, askTitle});}} 
                        style={styles.answerButton}>
                        <Text style={styles.answerButtonText}>답변 작성</Text>
                    </TouchableOpacity>
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
        height: hp('10%'),
        width: wp('100%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        marginLeft: (wp('17%') * 2) / 5,
        height: wp('17%'),
        width: wp('17%'),
        borderRadius: (wp('17%') * 1) / 2,
        backgroundColor: 'white'
    },
    profileText:{
        alignItems: 'center', // → 꼼수(수정 必)
        flexDirection: 'row' // → 꼼수(수정 必)
    },
    QuestionerName: {
        fontFamily:'NanumSquareR', 
        color: 'white', 
        fontSize: wp('4%'), 
        marginLeft: wp('2.5%')
    },
    askTitle: {
        fontFamily:'NanumSquareR', 
        color: 'black',
        fontSize: wp('5%'), 
        marginLeft: wp('2.5%')
    },
    contents3:{
        height: hp('65%'),
        width: wp('100%'),
        // backgroundColor: 'blue' (for test)
    },
    contents4:{
        height: hp('10%'),
        width: wp('100%'),
        justifyContent: 'center', // → button
        alignItems: 'center', // → button
    },
    answerButton: {
        backgroundColor: 'lightblue',
        borderRadius: 4,
        height: hp('6%'),
        width: wp('90%'),
        justifyContent: 'center', // → text
        alignItems: 'center', // → text
    },
    answerButtonText: {
        fontFamily: 'godoRoundedR', 
        color: 'white', 
        fontSize: wp('5%')
    }
});

export default QuestionScreen;