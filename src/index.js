import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import {Provider as ProviderRedux} from "react-redux";
import history from "./history/history";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";

/* main styles */
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <ProviderRedux store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </ProviderRedux>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
