import axios from 'axios';
export const ACTIVITY_UPDATE='activity_update';
export function activityAction(activity){
	return{
		type:ACTIVITY_UPDATE,
		payload:{
			activity:activity
		}
	}
}

export function fetchActivityApi(){
	let token=localStorage.getItem('token');
	return dispatch=>{
		axios.get('/api/getActivity',{headers:{Authorization:`Bearer ${token}`}})
			.then((res)=>{
				dispatch(activityAction(res.data));
			});
	}
}