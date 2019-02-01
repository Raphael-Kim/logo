import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen_Info from '../screens/SignUpScreen(Info)';
import SignUpScreen_Agreement from '../screens/SignUpScreen(Agreement)';

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator  = createStackNavigator(
    {
        LogIn: {
            screen: LogInScreen
        },
        SignUp_Info: {
            screen: SignUpScreen_Info
        },
        SignUp_Agreement: {
            screen: SignUpScreen_Agreement
        }
    },
    {
        initialRouteName: 'LogIn',
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