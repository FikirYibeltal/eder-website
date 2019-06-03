import axios from 'axios';
export const DESCRIPTION_UPDATE='description_action';
export function descriptionAction (description){
	return{type:DESCRIPTION_UPDATE,
			payload:{
				description:description
			}
		}
}
export function fetchDescriptionApi(){
	return dispatch=>{
		axios.get('/getdescription')
			.then((res)=>{
				dispatch(descriptionAction(res.data));
			});
	}
}