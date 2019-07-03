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
	let token=localStorage.getItem('token');
	return dispatch=>{
		axios.get('/api/getalluser',{headers:{Authorization:`Bearer ${token}`}})
		.then((res)=>{
			dispatch(updateUser(res.data));
		});
	}
	
}