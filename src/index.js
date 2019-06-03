import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from "react-router-dom";

//using redux and thunk
import {applyMiddleware,combineReducers,createStore,compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/message-reducer';
import userReducer from './reducers/users-reducer';
import activityReducer from './reducers/activity-reducer';
import paymentReducer from './reducers/payment-reducer';
import descriptionReducer from './reducers/description-reducer';
import usernameReducer from './reducers/username-reducer';
//middleware
const middlewares=[thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allReducers=combineReducers({
		message:messageReducer,
		users:userReducer,
		activity:activityReducer,
		payment:paymentReducer,
		username:usernameReducer,
		description:descriptionReducer	
});

const store=createStore(allReducers,{
	message:{
		name:"",
		email:"",
		message:""
	},
	users:[],
	activity:[],
	payment:[],
	username:[],
	description:[]
},

	composeEnhancers(applyMiddleware(...middlewares))
);
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
