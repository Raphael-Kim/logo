import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

// API: createStackNavigator(RouteConfigs, StackNavigatorConfig);
const AppNavigator  = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        initialRouteName: 'Home',
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