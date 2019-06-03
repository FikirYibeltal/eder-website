import {DESCRIPTION_UPDATE} from '../actions/description-action';
export default function descriptionReducer(state=[],{type,payload}){
	switch(type){
		case DESCRIPTION_UPDATE:
			return {
				...state,description:payload.description
			}
		default:
			return state;
	}
	
}