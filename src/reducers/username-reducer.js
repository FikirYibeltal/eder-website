import {USERNAME_UPDATE} from '../actions/username-action';
export default function usernameReducer(state=[],{type,payload}){
	switch(type){
		case USERNAME_UPDATE:
			return {
				...state,username:payload.username
			}
		default:
			return state;
	}
	
}