import React from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class SignUpScreen_Agreement extends React.Component{
    state={
        job: '',
        signUpState: true,
        check1: require('../../assets/images/beforeCheck.png'),
        check2: require('../../assets/images/beforeCheck.png'),
        check3: require('../../assets/images/beforeCheck.png'),
        check4: require('../../assets/images/beforeCheck.png'),
        fordb1: false,
        fordb2: false,
        fordb3: false
    };

    render(){

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
                <View style={styles.contents2}>
                    <Text style={styles.agreementTitle}>약관동의</Text>
                    <View style = {styles.agreementLine}/>

                    <View style={styles.checkAll}>
                        <TouchableOpacity onPress={this.fullCheck}>
                            <Image source={this.state.check1}/>
                        </TouchableOpacity>
                        <Text style={styles.titleAll}>
                            이용약관, 개인정보 수집 및 이용, 푸시 알림 수신(선택)에 모두 동의합니다.
                        </Text>
                    </View>

                    <View style={styles.checkFirst}>
                        <TouchableOpacity onPress={this.check1}>
                                <Image source={this.state.check2}/>
                        </TouchableOpacity>
                        <Text style={styles.titleOfOthers}>
                            (필수) 이용약관 동의
                        </Text>
                    </View>
                    <View style={styles.cardFirst}>
                        <ScrollView>
                            <Text style={styles.textOfOthers}>
                                우리 회사에서 어떤 서비스를 유저에게 제공하는지에 대한 설명 서비스는 제공하지만, 
                                이 서비스에 관한 지적재산권은 우리 회사의 소유라는 것 유저들이 서비스를 사용하도록 
                                우리 회사에서 유저들에게 서비스 사용에 관해 어떤 라이센스를 부여하는지에 대한 설명 
                                유저들이 서비스를 사용하면서 우리 회사에 제공하는 정보가 있다면 그 정보를 우리 회사가 
                                사용해도 된다고 유저들이 허가한다는 내용 서비스 사용에 제한되는 점이 있다면 어떤 
                                사항들인지에 대한 설명 유저가 법이나 규정 또는 회사에서 명시한 사용 정책들을 어길 경우 
                                발생할 수 있는 절차에 대한 문구 회사에서 유저들을 어떻게 모니터링 하는지에 대한 
                                내용 제공하는 서비스를 사용하기 위해 유저의 서비스 이용 내용을 우리회사가 모니터링한다는 
                                것을 동의한다는 내용 이용약관에 대해 분쟁이 발생할 경우 어느 나라 법을 따를 것인지에 
                                대한 내용 유저들이 이용약관에 대해 회사에 연락하고자 할 때 연락받을 사람의 이름, 주소, 
                                전화번호, 이메일 주소, 그 외 해당하는 연락처 표기
                            </Text>
                        </ScrollView>
                    </View>    

                    <View style={styles.checkSecond}>
                        <TouchableOpacity onPress={this.check2}>
                                <Image source={this.state.check3}/>
                        </TouchableOpacity>
                        <Text style={styles.titleOfOthers}>
                            (필수) 개인정보 수집 및 이용에 대한 안내
                        </Text>
                    </View>
                    <View style={styles.cardSecond}>
                        <ScrollView>
                            <Text style={styles.textOfOthers}>
                                유저가 우리회사의 웹사이트나 서비스 사용을 위해 계정을 만드는 것이 요청될 경우, 유저는 
                                우리회사가 요구하는 사항에 대한 정확한 정보를 입력하여 등록절차를 완료해야 한다. 유저의 
                                아이디와 패스워드를 작성하고 난 후 유저가 만든 패스워드 등을 타인이 알지 못하도록 
                                안전하게 관리하는 것에 대한 책임은 유저들에게 있다. 유저는 타인에게 계정을 양도해서는 안 
                                되며, 만약 유저의 계정을 유저가 허가하지 않은 타인이 사용한 것 같다면 유저는 우리회사에 
                                바로 알려야 한다. 우리회사는 타인이 유저의 허락 없이 유저의 계정 정보를 사용하여 발생한 
                                손해에 대한 책임이 없다. 타인이 유저의 계정을 사용함으로써 우리회사나 제휴사 등에 손해가 
                                발생할 경우 유저는 이를 보상해야 할 수도 있다.
                            </Text>
                        </ScrollView>
                    </View>

                    <View style={styles.checkThird}>
                        <TouchableOpacity onPress={this.check3}>
                                <Image source={this.state.check4}/>
                        </TouchableOpacity>
                        <Text style={styles.titleOfOthers}>
                            (선택) 푸시 알림 수신 동의
                        </Text>
                    </View>

                </View>

                {/*전체 3 칸 중 3번째 칸, 화살표 버튼이 들어가는 칸*/}
                <View style={styles.contents3}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 40, /*backgroundColor: 'black'(for test)*/}}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp_Info');}} >
                            <Image source={require('../../assets/images/left.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => {this.submit();}}
                            disabled={this.state.signUpState}>
                            {this.state.signUpState === true ? 
                            <Image source={require('../../assets/images/SignUpDisable.png')}/>:
                            <Image source={require('../../assets/images/SignUpAble.png')}/>}
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, marginRight: 40, /*backgroundColor: 'black'(for test)*/}}/>
                </View>
            </View>
        );
    }

    fullCheck = () => {
        if( this.state.check1 === require('../../assets/images/beforeCheck.png')){
            this.setState({
                check1: require('../../assets/images/afterCheck.png'),
                check2: require('../../assets/images/afterCheck.png'),
                check3: require('../../assets/images/afterCheck.png'),
                check4: require('../../assets/images/afterCheck.png'),
                fordb1: true,
                fordb2: true,
                fordb3: true,
                signUpState: false
            });
        }else{
            this.setState({
                check1: require('../../assets/images/beforeCheck.png'),
                check2: require('../../assets/images/beforeCheck.png'),
                check3: require('../../assets/images/beforeCheck.png'),
                check4: require('../../assets/images/beforeCheck.png'),
                fordb1: false,
                fordb2: false,
                fordb3: false,
                signUpState: true
            });
        }
    }

    check1 = () => {
        if(this.state.check2 === require('../../assets/images/beforeCheck.png')){
            this.setState({check2: require('../../assets/images/afterCheck.png'), fordb1: true});
            this.state.check3 === require('../../assets/images/afterCheck.png') ? this.setState({signUpState:false}) : this.setState({signUpState:true});
        }else{
            this.setState({check2: require('../../assets/images/beforeCheck.png'), signUpState: true, fordb1: false});
        }
    }
    check2 = () => {
        if(this.state.check3 === require('../../assets/images/beforeCheck.png')){
            this.setState({check3: require('../../assets/images/afterCheck.png'), fordb2: true});
            this.state.check2 === require('../../assets/images/afterCheck.png') ? this.setState({signUpState:false}) : this.setState({signUpState:true});
        }else{
            this.setState({check3: require('../../assets/images/beforeCheck.png'), signUpState: true, fordb2: false});
        }
    }
    check3 = () => {
        if(this.state.check4 === require('../../assets/images/beforeCheck.png')){
            this.setState({check4: require('../../assets/images/afterCheck.png'), fordb3: true});
        }else{
            this.setState({check4: require('../../assets/images/beforeCheck.png'), fordb3: false});            
        }
    }

    submit = async () => {
        try{
            let response = await fetch('http://18.222.158.114:3210/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    email: this.props.navigation.state.params.email, 
                    name: this.props.navigation.state.params.name, 
                    check1: this.state.fordb1,
                    check2: this.state.fordb2,
                    check3: this.state.fordb3,
                    kakaoCode: this.props.navigation.state.params.kakaoCode,
                    kakaoImg: this.props.userInfo.properties.profile_image
                })
            });
            //console.log(response);
            try{
                let response = await fetch('http://18.222.158.114:3210/fetchUserCode', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;charset=UTF-8',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        kakaoCode: this.props.navigation.state.params.kakaoCode                   
                    })
                })
                var json = await response.json();
                console.log(json[0]);
                this.props.setUserProfile(json[0]);
                this.props.logIn();
            }
            catch(error) {
                console.log('error_userCode')
            }
        }
        catch(error){
            console.log('error_submit');
        }
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
        width: wp('100%')
        // justifyContent: 'center'(사용안해도 내부에서 flex 활용 1:1 부여하기 때문에 문제 없음),
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    logoView1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
        // ↑ 위에 status bar 고려해서 마진값 부여
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
    logoLine:{
        borderBottomWidth: 1,
        borderBottomColor:'white',
        marginHorizontal: 125,
    },
    contents2: {
        flex: 6.3,
        // backgroundColor: 'blue',
        padding: 60,  
        justifyContent: 'center',
        // alignItems: 'center'(내부에서 View 컴포넌트를 사용하는 경우 주의할 것) -> flex 대신에 width, height 값을 부여하면 어떨지 고려해볼 것(!)
    },
    agreementTitle: {
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
        backgroundColor:'white',
        marginLeft: 10
    },
    agreementLine:{
        borderBottomWidth: 1,
        borderBottomColor:'#E5E5E5',
        marginTop: 10
    },
    checkAll:{
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        // ↑ 수평 축(secondary axis) 기준으로 가운데 맞춤을 하기 위해서 작성
        marginTop: 10,
    },
    titleAll:{
        flex: 1, 
        // ↑ 'flex: 1'을 안하면 작성한 text가 view 밖으로 튀어나가는 문제가 발생 
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        marginLeft: 10,
        // backgroundColor:'white'(for test)
    },
    checkFirst:{
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        // ↑ 수평 축(secondary axis) 기준으로 가운데 맞춤을 하기 위해서 작성
        marginTop: 10,
    },
    cardFirst:{
        width: '85%',
        height: '30%',
        // ↑ ↑ 'react-native-responsive-screen'와 달리, 일반적인 비율 표기법은 바로 겉 뷰 박스가 측정의 기준
        marginLeft: 35,
        // ↑ height, width의 값을 절대값(비율도 결국에는 절대값)으로 부여하면, 그 절대값을 만족해야 하기 때문에 뷰 박스 밖으로 넘어가는 문제 발생 
        borderColor: '#E5E5E5',
        borderWidth: 1
    },
    checkSecond:{
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // ↑ 수평 축(secondary axis) 기준으로 가운데 맞춤을 하기 위해서 작성
        marginTop: 10,
    },
    cardSecond:{
        width: '85%',
        height: '30%',
        // ↑ ↑ 'react-native-responsive-screen'와 달리, 일반적인 비율 표기법은 바로 겉 뷰 박스가 측정의 기준
        marginLeft: 35,
        // ↑ height, width의 값을 절대값(비율도 결국에는 절대값)으로 부여하면, 그 절대값을 만족해야 하기 때문에 뷰 박스 밖으로 넘어가는 문제 발생 
        borderColor: '#E5E5E5',
        borderWidth: 1
    },
    checkThird:{
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // ↑ 수평 축(secondary axis) 기준으로 가운데 맞춤을 하기 위해서 작성
        marginTop: 10,
    },
    titleOfOthers: {
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        marginLeft: 10
        // backgroundColor:'white'(for test)
    },
    textOfOthers: {
        fontFamily: 'NanumSquareR', 
        fontSize: 10,
        color: 'black',
        backgroundColor:'white'
    },
    contents3: {
        flex: 2.8,
        flexDirection: 'row',
        // backgroundColor: 'yellow'(for test)
    },
    textInput: {
        fontFamily: 'NanumSquareR', 
        fontSize: 12,
        color: 'black',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        marginTop: 25
    }
});

export default SignUpScreen_Agreement;