import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import reportWebVitals from './reportWebVitals';
import MainPage from "./components/Page/MainPage/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <MainPage/>
);

reportWebVitals();
