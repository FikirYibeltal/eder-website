export const UPDATE_MESSAGE="updateMessage";
export const UPDATE_NAME="updateName";
export const UPDATE_EMAIL="updateEmail";
export const UPDATE_EACH_MESSAGE="updateEachMessage";
export function updateMessage(newMessage){
	return{
		type:UPDATE_MESSAGE,
		payload:{
			name:newMessage.name,
			email:newMessage.email,
			message:newMessage.message
		}
	}
}
export function updateName(name){
	return{
		type:UPDATE_NAME,
		payload:{
			name:name
		}
	}
}
export function updateEmail(email){
	return{
		type:UPDATE_EMAIL,
		payload:{
			email:email
		}
	}
}
export function updateEachMessage(message){
	return{
		type:UPDATE_EACH_MESSAGE,
		payload:{
			message:message
		}
	}
}