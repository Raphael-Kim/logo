import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeScreen from "./presenter";
import { AppLoading, Font } from 'expo';

class Container extends React.Component {
    static propTypes = {
        feed: PropTypes.array,
        getFeed: PropTypes.func
    };

    data = [
        {id: 1, key: 'a'}, 
        {id: 2, key: '소그라테스의 주지주의란?'}, 
        {id: 3, key: '내일 아침메뉴란?'}, 
        {id: 4, key: '유부가 좋아요?'}, 
        {id: 5, key: '젤리로 아침먹어도 되나요?'}, 
        {id: 6, key: '점심을 꼭 드실건가요?'}, 
        {id: 7, key: '퇴근하면 집가나요?'}, 
        {id: 8, key: '여기까지 본걸 축하해요?'}, 
        {id: 9, key: '질문 등록 잘하세요?'}]


    state = {
        isFetching: false,
        loaded: false // for font
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.feed) {
            this.setState({
                isFetching: false
            });
        }
    };

    componentWillMount(){
        this._loadAssetsAsync();
    }
    
    render() {
        console.log("container render");
        /* for font(start) */
        if(!this.state.loaded) {
            return <AppLoading />;
        }
        /* for font(end) */
        
        return (
            <HomeScreen 
                {...this.props} 
                {...this.state} 
                refresh={this._refresh} 
                addData={this._addData} 
                keyExtractor={this._keyExtractor}
                data={this.data} 
            />
        );
    }

    _refresh = () => {
        // const { getFeed } = this.props;
        this.setState({
            isFetching: true
        });
        // getFeed();
        this.data.push({id:11, key: '위에서 새로고침 하셨나요?'});
        setTimeout(() => {
            this.setState({
                isFetching: false
            });
        }, 10000);
    };

    _addData = () => {
        console.log('발동');
        this.data.push({id:10, key: '밑에 추가된 아이템이군요?'});
    };

    _keyExtractor = (item, index) => {
        return item.id.toString()
    };

    /*for font(start)*/
    _loadAssetsAsync = async () =>{
        await Font.loadAsync({
            NanumSquareR: require("../../assets/fonts/NanumSquareR.ttf"),
            godoRoundedR: require('../../assets/fonts/godoRoundedR.ttf')
        });
        this.setState({ loaded: true });
    };
    /*for font(end)*/
}

export default Container;