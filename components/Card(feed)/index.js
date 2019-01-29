import React from 'react';
import { View, Image, StyleSheet, Platform, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Card extends React.PureComponent {
    render() {
        console.log("card render");
        return(
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text> {this.props.text} </Text>
                </View>
                <View style={styles.view2}>
                    <Image
                        source={require('../../assets/images/suzi(x4).png')} 
                        style={styles.profile} 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    view2: {
        flex: 1.5, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        backgroundColor:'#F3F0FF'
    },
    profile: {
        position: 'absolute',
        top: -(wp('15%') / 2),
        left: (wp('15%') / 2),
        height: wp('15%'),
        width: wp('15%')
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: wp('90%'),
        height: hp('40%'),
        marginBottom: hp('10%'),
        ...Platform.select({
            ios: {
                shadowColor:"rgb(50, 50, 50)",
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset:{
                    height: 3,
                    width: 1
                }
            },
            android: {
                elevation: 2
            }
        })
    }
});

export default Card;