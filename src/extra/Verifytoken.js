import UserProfile from '../LoginEnclosure.js';
import decode from 'jwt-decode';
export default function Verifytoken(token){
				var current_time = new Date().getTime() / 1000;
				var decoded = decode(token);
				if(current_time<decoded.exp){
					console.log(decoded);
					UserProfile.setName(decoded.user.Name);
	       			UserProfile.setId(decoded.user.User_id);
    			 	return decoded.user;
				}else{
					return false;
				}
}