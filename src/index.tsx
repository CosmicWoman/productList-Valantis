import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store";
import MainPage from "./components/Page/MainPage/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <MainPage/>
    </Provider>
);

reportWebVitals();
