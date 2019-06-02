import axios from 'axios';
export const UPDATE_USER="update_user";
export function updateUser(user){
	return{
		type:UPDATE_USER,
		payload:{
			users:user
		}
	}
}
export function fetchApi(){
	return dispatch=>{
		axios.get('/getalluser')
		.then((res)=>{
			dispatch(updateUser(res.data));
		});
	}
	
}