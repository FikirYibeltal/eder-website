import {UPDATE_MESSAGE} from '../actions/message-action';
import {UPDATE_NAME} from '../actions/message-action';
import {UPDATE_EMAIL} from '../actions/message-action';
import {UPDATE_EACH_MESSAGE} from '../actions/message-action';
const initial_state={
	name:"",email:"",message:""
}
export default function messageReducer(state=initial_state,{type,payload}){
	switch(type){
		case UPDATE_MESSAGE:
			return {...state,
				name:payload.name,
				email:payload.email,
				message:payload.message};
		case UPDATE_NAME:
			return {...state,
				name:payload.name};
		case UPDATE_EMAIL:
			return {...state,
				email:payload.email};
		case UPDATE_EACH_MESSAGE:
			return {...state,
				message:payload.message};
		default:
			return state;

	}
	return state;
}