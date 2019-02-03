import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
// ↑ 경로 관련해서 문제 발견해서 수정('redux-persist/es/integration/react';)
import configureStore from './redux/configureStore';
import RootContainer from './components/RootContainer';

const { persistor, store } = configureStore();

export default class App extends React.Component {
    
    render() {
        console.log(store.getState(), 'from App.js');
        
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor}
                // This delays the rendering of the app's UI until 'the persisted state(on the disk)' has been retrieved and saved to redux.
                > 
                    <RootContainer />
                </PersistGate>
            </ Provider>
        );
    }
}
