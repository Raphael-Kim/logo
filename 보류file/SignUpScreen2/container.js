import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import SignUpScreen2 from "./presenter";
import { Font } from 'expo';

class Container extends Component {
    state={
        loaded: false,
        /* 포트 로드 */
        job: '',
        schoolName: '',
        major: '',
        secondMajor: '',
        schoolNumber: '',
        /* 입력 받는 변수 */
        rightState: true,
        /* 오른쪽 화살표 가능 불가능 버튼 */
        hidden1: true,
        /* 학교 클릭시 입력 할 것들 출력 */
        hidden2: true,
        /* 학번 입력시 가능 불가능 출력 */
        hidden3: true,
        /* 학생 이외의 직업 선택시 경고 문구 출력 */
        color0: '#E5E5E5',
        color1: '#E5E5E5',
        color2: '#E5E5E5',
        color3: '#E5E5E5',
        /* 직업 버튼 텍스트 색 */
        data: [],
        /* 페치 데이터 저장 */
        uniAuto: true,
        /* 대학교 목록 자동 생성 */
        majorAuto: true,
        /* 전공 목록 자동 생성 */
        majorAuto2: true,
        /* 전공 목록 자동 생성 */
        choseDone1: false,
        /* 대학 선택시 재 선택 불가능 */
        choseDone2: false,
        /* 전공 선택시 재 선택 불가능 */
        choseDone3: false
        /* 전공2 선택시 재 선택 불가능*/
    };

    componentWillMount(){
        this._loadAssetsAsync();
    }

    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
          NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
          godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf'),
        });
        this.setState({ loaded: true });
    };
    /*for font*/

    render() {
        return (
          <SignUpScreen2
           {...this.props} 
           {...this.state}
           signUpSchool={this._signUpSchool}
           uniAutoComplete={this._uniAutoComplete()}
           signUpMajor={this._signUpMajor}
           majorAutoComplete={this._majorAutoComplete()}
           signUpSecondMajor={this._signUpSecondMajor}
           majorAutoComplete2={this._majorAutoComplete2()}
           signUpNumber={this._signUpNumber}
           collegian={this._collegian}
           etc1={this._etc1}
           etc2={this._etc2}
           etc3={this._etc3}
           />
        );
    }
    
    _signUpSchool = (text) => {
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(text)) {
            if(this.state.choseDone1 === false){
                this.setState({
                    schoolName: text,
                    uniAuto: false
                }, () => {
                    fetch('http://18.222.158.114:3210/searchUni', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                checkUni: this.state.schoolName 
                        })   
                    })
                    .then(response => { return response.json(); })
                    .then(responseData => { this.setState({ data : responseData})})
                    if(this.state.choseDone1 === true && this.state.choseDone2 === true && this.state.choseDone3 === true){
                        this.setState({rightState: false});
                      }else{
                        this.setState({rightState: true});
                    }
                    if(this.state.schoolName === '') {
                        this.setState({
                            uniAuto: true
                        });
                    }
                });
            }
         }
    }

    _uniAutoComplete(){
            if(this.state.data.length > 5){
                newData = new Array;
                for(let i=0;i<5;i++){
                  newData.push(this.state.data[i]);
                }
                return newData.map(newData =>
                  <TouchableOpacity key={newData.schoolCode} onPress={() => {this.setState({schoolName: newData.uniName, uniAuto: true, choseDone1: true});}}>
                      <Text style={styles.autocomplete}>{newData.uniName}</Text>
                  </TouchableOpacity>
                )
              }
          
              else{
                return this.state.data.map(data =>
                  <TouchableOpacity key ={data.schoolCode} onPress={() => {this.setState({schoolName : data.uniName, uniAuto: true, choseDone1: true});}}>
                      <Text  style={styles.autocomplete}>{data.uniName}</Text>
                  </TouchableOpacity>    
                )
            }
    }

    _signUpMajor = (text) => {
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(text)) {
            if(this.state.choseDone1 === true && this.state.choseDone2 === false){
                this.setState({
                    major: text,
                    majorAuto: false
                }, () => {
                    fetch('http://18.222.158.114:3210/searchMajor', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                checkUni: this.state.schoolName,
                                checkMajor: this.state.major 
                        })   
                    })
                    .then(response => { return response.json(); })
                    .then(responseData => { this.setState({ data : responseData})})
                });
            }
        }
    }

    _majorAutoComplete(){
        if(this.state.data.length > 5){
          newData = new Array;
          for(let i=0;i<5;i++){
            newData.push(this.state.data[i]);
          }
          return newData.map(newData =>
            <TouchableOpacity key={newData.majorName} onPress={() => {this.setState({major: newData.majorName, majorAuto: true, choseDone2: true});}}>
                <Text style={styles.autocomplete}>{newData.majorName}</Text>
            </TouchableOpacity>
          )
        }
    
        else{
          return this.state.data.map(data =>
            <TouchableOpacity key ={data.majorName} onPress={() => {this.setState({major : data.majorName, majorAuto: true, choseDone2: true});}}>
                <Text  style={styles.autocomplete}>{data.majorName}</Text>
            </TouchableOpacity>    
          )
        }
    }

    _signUpSecondMajor = (text) => {
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(text)) {
            if(this.state.choseDone1 === true && this.state.choseDone2 === true && this.state.choseDone3 === false){
                this.setState({
                    secondMajor: text,
                    majorAuto2: false
                }, () => {
                    fetch('http://18.222.158.114:3210/searchMajor', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                checkUni: this.state.schoolName,
                                checkMajor: this.state.secondMajor 
                        })   
                    })
                    .then(response => { return response.json(); })
                    .then(responseData => { this.setState({ data : responseData})})
                });
            }
        }
    }

    _majorAutoComplete2(){
        if(this.state.data.length > 5){
          newData = new Array;
          for(let i=0;i<5;i++){
            newData.push(this.state.data[i]);
          }
          return newData.map(newData =>
            <TouchableOpacity key={newData.majorName} onPress={() => {this.setState({secondMajor: newData.majorName, majorAuto2: true, choseDone3: true});}}>
                <Text style={styles.autocomplete}>{newData.majorName}</Text>
            </TouchableOpacity>
          )
        }
    
        else{
          return this.state.data.map(data =>
            <TouchableOpacity key ={data.majorName} onPress={() => {this.setState({secondMajor: data.majorName, majorAuto2: true, choseDone3: true});}}>
                <Text  style={styles.autocomplete}>{data.majorName}</Text>
            </TouchableOpacity>    
          )
        }
    }

    _signUpNumber = (text) => {
        if(this.state.choseDone1 === true && this.state.choseDone2 === true){
            this.setState({
                schoolNumber: text,
            },() => {
                fetch('http://18.222.158.114:3210/searchNumber', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                            checkNumber: this.state.schoolNumber 
                    })   
                })
                .then(response => { return response.json(); })
                .then(responseData => {
                                          if(this.state.choseDone1 === true && this.state.choseDone2 === true){
                                            Object.keys(responseData).length === 0  ? this.setState({hidden2:true, rightState: false}) : this.setState({hidden2: false, rightState: true});
                                          }else{
                                            this.setState({rightState: true});
                                          }
                                      })
                if(this.state.schoolNumber === ''){ 
                    this.setState({ hidden2: true});
                }                      
            });
        }
    }
    
    _collegian = () => {
        this.setState({
            hidden1: false,
            hidden3: true,
            rightState: true,
            job: 'collegian',
            color0: '#292F6E',
            color1: '#E5E5E5',
            color2: '#E5E5E5',
            color3: '#E5E5E5'
        });
    }

    _etc1 = () => {
        this.setState({
            hidden1: true,
            hidden2: true,
            hidden3: false,
            rightState: false,
            job: 'employee',
            color0: '#E5E5E5',
            color1: '#292F6E',
            color2: '#E5E5E5',
            color3: '#E5E5E5'
        });
    }

    
    _etc2 = () => {
        this.setState({
            hidden1: true,
            hidden2: true,
            hidden3: false,
            rightState: false,
            job: 'business',
            color0: '#E5E5E5',
            color1: '#E5E5E5',
            color2: '#292F6E',
            color3: '#E5E5E5'
        });
    }

    
    _etc3 = () => {
        this.setState({
            hidden1: true,
            hidden2: true,
            hidden3: false,
            rightState: false,
            job: 'etc',
            color0: '#E5E5E5',
            color1: '#E5E5E5',
            color2: '#E5E5E5',
            color3: '#292F6E'
        });
    }
}
const styles = StyleSheet.create({
    autocomplete:{
        fontFamily: 'NanumSquareR', 
        fontSize: 15,
        color: 'black',
    }
});

export default Container;