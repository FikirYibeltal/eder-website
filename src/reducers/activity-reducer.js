import {ACTIVITY_UPDATE} from '../actions/activity-action';
export default function activityReducer(state=[],{type,payload}){
	switch(type){
		case ACTIVITY_UPDATE:
			return {...state,activity:payload.activity};
		default:
			return state;
	}	
	return state;
}