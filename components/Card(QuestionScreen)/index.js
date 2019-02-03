import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';

class Card extends React.PureComponent {
    render() {
        console.log("card render");
        const { kakaoImg } = this.props;

        return(
            <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Comment');}}>
                <View style={styles.container}>
                    <View style={styles.view1}>
                        <Text style={styles.askTitle}>{this.props.askTitle}</Text>
                    </View>
                    
                    <View style={styles.view2}>
                        <LinearGradient 
                            colors={['#F3F0FF', 'white']} 
                            style={styles.view2_gradient}>
                            <Text style={styles.answerContent}>{this.props.content}</Text>
                        </LinearGradient>

                        <Image
                            source={{uri: `${kakaoImg}`}}
                            style={styles.profileImage}/>

                        <Text style={styles.answeredBy}>answered by</Text>

                        <Text style={styles.profileText}>
                            <Text style={styles.profileName}>{this.props.name} </Text> {/* → 이름 뒤 공란(space) 必*/}
                            <Text style={styles.profileJob}></Text>                   
                        </Text>                   
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 10,
        width: wp('80%'),
        height: hp('55%'),
        marginTop: hp('2.5%'), 
        // ↑ 카드(card)의 아래 테두리선(borderBottom)이 보이도록 marginTop을 설정
        ...Platform.select({
            ios: {
                shadowColor:"rgb(50, 50, 50)",
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset:{
                    height: 3,
                    width: 2
                }
            },
            android: {
                elevation: 2
            }
        })
    },
    view1: {
        flex: 1, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    askTitle: {
        fontFamily: 'NanumSquareR',
        color: 'black',
        textAlign: 'center',
        fontSize: wp('5%'),
        marginBottom: wp('5%')
    },
    view2: {
        flex: 3, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10
    },
    view2_gradient: {
        flex: 1, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    answerContent: {
        fontFamily: 'NanumSquareR',
        color: 'black',
        textAlign: 'center',
        fontSize: wp('4%'),
    },
    profileImage: {
        position: 'absolute',
        top: -((wp('15%') * 1) / 2),
        left: (wp('15%') * 2) / 5,
        height: wp('15%'),
        width: wp('15%'),
        borderRadius: (wp('15%') * 1) / 2
    },
    answeredBy: {
        // ↓ 위치(position)
        position: 'absolute',
        top: -(wp('3%') + wp('1.5%')),
        left: ((wp('15%') * 7) / 5) + wp('1.5%'),
        // ↓ 폰트(font)
        fontFamily: 'NanumSquareR',
        color: '#7F7F7F',
        textAlign: 'center',
        fontSize: wp('3%'),
    },
    profileText: {
        // ↓ 위치(position)
        position: 'absolute',
        top: wp('1.5%'),
        left: ((wp('15%') * 7) / 5) + wp('1.5%'),
    },
    profileName: {
        // ↓ 폰트(font)
        fontFamily: 'NanumSquareR',
        color: 'black',
        textAlign: 'center',
        fontSize: wp('4%'),
    },
    profileJob: {
        // ↓ 폰트(font)
        fontFamily: 'NanumSquareR',
        color: 'black',
        textAlign: 'center',      
        fontSize: wp('3%')
    }
});

export default withNavigation(Card);