import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

import App from "./App";
import rootReducer from "./reducers";

import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer theme="colored" />
            <App />
        </BrowserRouter>
    </Provider>
);
