                    {/*전체 # 칸 중 3번째 칸, 랭킹이 들어가는 칸*/}
                    <View style={styles.contents3}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image 
                                    source={require('../../assets/images/ranking(x4).png')}
                                    style={{width: wp('4%') , height: wp('4%')}}
                                    resizeMode={'contain'}
                            />
                            <Text>
                                실시간 우리학교 랭킹
                            </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>            
                            <TouchableOpacity 
                                onPress={this._onPress}>
                                <Image 
                                    source={require('../../assets/images/upload(x4).png')}
                                    style={{width: wp('70%') , height: hp('10%')}}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*전체 # 칸 중 4번째 칸, 광고가 들어가는 칸*/}
                    <View style={styles.contents4}>
                        <View style={{alignItems: 'center'}}>

                        </View>
                    </View>

                    {/*전체 # 칸 중 5번째 칸, XX가 들어가는 칸*/}
                    <View style={styles.contents5}>
                    </View>



class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{color: textColor}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}