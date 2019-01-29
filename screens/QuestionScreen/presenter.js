import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';


class QuestionScreen extends React.Component {
  state = {
    visibleModal: false,
  };

  test = () => {
    this.setState({ visibleModal: !this.state.visibleModal});
  };

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.test}>
                <View style={styles.button}>
                    <Text>다물어봐바 아가야</Text>
                </View>
            </TouchableOpacity>
            <Modal isVisible={this.state.visibleModal}>
                <TouchableOpacity onPress={this.test}>
                    <View style={styles.modalContent}>
                        <Text>야호</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});


export default QuestionScreen;