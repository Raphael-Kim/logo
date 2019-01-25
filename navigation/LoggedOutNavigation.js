import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen1 from '../screens/SignUpScreen1';
import SignUpScreen2 from '../screens/SignUpScreen2';
import SignUpScreen3 from '../screens/SignUpScreen3';

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator  = createStackNavigator(
    {
        LogIn: {
            screen: LogInScreen
        },
        SignUp1: {
            screen: SignUpScreen1
        },
        SignUp2: {
            screen: SignUpScreen2
        },
        SignUp3: {
            screen: SignUpScreen3
        },

    },
    {
        initialRouteName: 'SignUp3',
        /*  ↓ headerMode가 'none'이니깐 없어도 괜찮지 않을까? (for test)
            defaultNavigationOptions: {
                title: 'LogIn',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTintColor: '#000000',
                // headerTransparent: true,
            },
        */
        headerMode: 'none'
    }
);

const LoggedOutNavigation = createAppContainer(AppNavigator);

export default LoggedOutNavigation;