import {UPDATE_USER} from '../actions/user-action';
export default function userReducer(state=[],{type,payload}){
	switch(type){
		case UPDATE_USER:
			return{...state,
				users:payload.users}
	}
	return state
}