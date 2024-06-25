import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserStore } from './components/userstore/UserStore';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={UserStore}>
    <App />
  </Provider>
  // </React.StrictMode>
);

