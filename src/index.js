import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';


axios.defaults.baseURL = 'https://sample-auth-7c2db.firebaseio.com';
axios.defaults.headers.common['authorization'] = "AUTH_TOKEN";
axios.defaults.headers.post['content-type'] = "application/json"
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();
