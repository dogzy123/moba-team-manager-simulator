import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './styles/index.scss';
import App from './App';
import {createStore} from "redux";
import mainReducer from "./reducers/main";

const store = createStore(mainReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('dtms-root')
);
