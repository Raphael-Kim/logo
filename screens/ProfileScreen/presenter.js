import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BackgroundFetch } from 'expo';

class ProfileScreen extends React.Component{
    state = {
        test : null
    };
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
                {this.props.beforePick === true ?
                <TouchableOpacity
                    style={styles.beforePick}
                    onPress={this.props.pickImage}> 
                </TouchableOpacity>
                :<TouchableOpacity
                    style={styles.profileImgContainer}
                    onPress={this.props.pickImage}>
                    {this.props.profileImg &&
                        <Image source={{uri: this.props.profileImg}} style={styles.profileImg}/>}    
                </TouchableOpacity>}
                <View style={{height: hp('8%'), width: wp('100%'), marginTop: 5, justifyContent: 'center'}}>
                    <Text style={styles.nickName}>{this.props.nickName}</Text>
                </View>
                <View style={{borderBottomColor: 'white', borderBottomWidth: 1}}></View>
                <View style={{height: hp('10%'), width: wp('80%'), marginTop: 5, alignItems: 'center' }}>
                    <Text style={styles.famousSaying}>{this.props.famousSaying}</Text>
                </View>
            </View>

            {/*전체 # 칸 중 3번째 칸, 랭킹이 들어가는 칸*/}
            <View style={styles.contents3}>
                        <View style={styles.buttonList}>
                                <TouchableOpacity onPress={this.props.clickSchool}>
                                    <Image source={this.props.schoolImg} style={{height: hp('13%'), width: wp('15%')}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.clickLevel}>
                                    <Image source={this.props.levelImg} style={{height: hp('13%'), width: wp('15%')}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.clickRanking}>
                                    <Image source={this.props.rankingImg} style={{height: hp('13%'), width: wp('15%')}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.clickScore}>
                                    <Image source={this.props.scoreImg} style={{height: hp('13%'), width: wp('15%')}} resizeMode='contain'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.clickAnswer}>
                                    <Image source={this.props.answerImg} style={{height: hp('13%'), width: wp('15%')}} resizeMode='contain'/>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.contents4}>
                            {this.props.school === true ? null:
                            <View style={{alignItems: 'center', marginTop: 15}}>
                                <Text style={styles.contentsStyle}>학교</Text>
                                <View style={styles.line2}/>
                                <Text>{this.props.MyUni}, {this.props.Major}, {this.props.SecondMajor}</Text>
                            </View>
                            }                            
                            {this.props.level === true ? null:
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.contentsStyle}>레벨</Text>
                                <View style={styles.line2}/>
                                <Text>{this.props.myLevel}</Text>
                            </View>
                            }
                            {this.props.ranking === true ? null:
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.contentsStyle}>랭킹</Text>
                                <View style={styles.line2}/>
                                    <View style={styles.contentsStyle2}>
                                        <View><Text>{this.props.myUni}</Text></View>
                                        <View><Text>대학 내 랭킹 from DB</Text></View>
                                    </View>
                                    <View style={styles.contentsStyle2}>
                                        <View><Text>{this.props.myMajor}</Text></View>
                                        <View><Text>과 내 랭킹 from DB</Text></View>
                                    </View>
                            </View>
                            }
                            {this.props.score === true ? null:
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.contentsStyle}>총점</Text>
                                <View style={styles.line2}/>
                                <Text>{this.props.myScore}</Text>
                            </View>
                            }
                            {this.props.answer === true ? null:
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.contentsStyle}>답한 질문</Text>
                                <View style={styles.line2}/>
                                <Text>내가 총 답한 질문 개수 from DB</Text>
                            </View>
                            }
                        </View>
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
        height: hp('40%'), 
        width: wp('100%'),
        alignItems: 'center'
    },
    profileImgContainer: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    beforePick: {
        height: 100,
        width: 100,
        borderRadius: 60,
        backgroundColor: 'white'  
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    /* height, width 상대값으로 수정 필요, height와 width의 절대값이 같아야 정사각형으로 사진이 뜨고 borderRadius 는 height 나 width의 1/2 값으로 설정하면 동그라미로 됨  */
    nickName:{
        fontFamily: 'godoRoundedR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('8%'),
    },
    famousSaying:{
        fontFamily: 'godoRoundedR',
        color: 'white',
        textAlign: 'center',
        fontSize: wp('5%'),
    },
    contents3: {
        height: hp('45%'), 
        width: wp('100%'),
        alignItems: 'center',
    },
    buttonList: {
        height: hp('10%'),
        width: wp('90%'),
        flexDirection : 'row',
        justifyContent: 'space-between',
        
    },
    contents4:{
        height: hp('35'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentsStyle:{
        fontFamily: 'godoRoundedR',
        color: '#D7A8F8',
        textAlign: 'center',
        fontSize: wp('5%'),
    },
    line2:{
        borderBottomWidth: 1,
        borderBottomColor: '#D7A8F8',
        marginHorizontal: 200,
    },
    contentsStyle2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProfileScreen;
