import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import intervalApp from './reducers';

var store = createStore(intervalApp);

ReactDOM.render(

    <Provider store={store}>
            <App />   
    </Provider>,
    document.getElementById('app')

);

