import React from 'react';
// import RootNavigation from "./navigation/RootNavigation"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import configureStore from "./redux/configureStore";
import RootContainer from "./components/RootContainer";

const { persistor, store } = configureStore();

export default class App extends React.Component {
    render() {
        return(
            <Provider store = {store}>
                <PersistGate persistor = {persistor}
                // This delays the rendering of the app's UI until "the persisted state(on the disk)" has been retrieved and saved to redux.
                > 
                    <RootContainer />
                </PersistGate>
            </ Provider>
        );
    }
}
