import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import LoggedInNavigation from "../../navigation/LoggedInNavigation";

class RootContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    };

    render() {
        const { isLoggedIn } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {isLoggedIn ? (
                    // Home 화면으로 이동
<<<<<<< HEAD
                    <LoggedInNavigation/>
                ) : (
                    // Login 화면으로 이동
                    <LoggedOutNavigation/>
=======
                    <LoggedOutNavigation/>
                ) : (
                    // Login 화면으로 이동
                    <LoggedInNavigation/>
>>>>>>> b40d14556c8517fd3bea261e4b2d43ff4765e51f
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