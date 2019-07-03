import axios from 'axios';
export const USERNAME_UPDATE='username_action';
export function usernameAction (username){
	return{type:USERNAME_UPDATE,
			payload:{
				username:username
			}
		}
}
export function fetchUsernameApi(){
	let token=localStorage.getItem('token');
    let config={headers:{Authorization:`Bearer ${token}`}};
	return dispatch=>{
		axios.get('/api/getusername',config)
			.then((res)=>{
				dispatch(usernameAction(res.data));
			});
	}
}