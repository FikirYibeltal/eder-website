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
	return dispatch=>{
		axios.get('/getusername')
			.then((res)=>{
				dispatch(usernameAction(res.data));
			});
	}
}