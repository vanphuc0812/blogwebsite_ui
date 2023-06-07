import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './Components/GlobalStyles';
<<<<<<< HEAD
import { StoreProvider } from './storage';
=======
import StoreProvider from './storage/provider';
>>>>>>> 965044c0b41feae925034fecd3c9acd30e9e0eb6

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <StoreProvider>
            <App />
        </StoreProvider>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
