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
	return dispatch=>{
		axios.get('/getActivity')
			.then((res)=>{
				dispatch(activityAction(res.data));
			});
	}
}