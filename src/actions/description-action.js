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
	let token=localStorage.getItem('token');
    let config={headers:{Authorization:`Bearer ${token}`}};
	return dispatch=>{
		axios.get('/api/getdescription',config)
			.then((res)=>{
				dispatch(descriptionAction(res.data));
			});
	}
}