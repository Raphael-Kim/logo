import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import LoggedInNavigation from "../../navigation/LoggedInNavigation";

class RootContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        checkTokenForKakao: PropTypes.func.isRequired
    };

    componentWillMount(){
        this.props.checkTokenForKakao();
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {isLoggedIn ? (
                    // Home 화면으로 이동
                    <LoggedOutNavigation/>
                ) : (
                    // Login 화면으로 이동
                    <LoggedInNavigation/>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    }
});

export default RootContainer;