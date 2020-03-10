import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
<Router basename="https://react-traveldiary.web.app/">
    <App/>
</Router>
, document.getElementById('root')
);
//ReactDOM.render(What to render, Where to render it) 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
