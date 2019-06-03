import {PAYMENT_UPDATE} from '../actions/payment-action';
export default function paymentReducer(state=[],{type,payload}){
	switch(type){
		case PAYMENT_UPDATE:
			return {
				...state,payment:payload.payment
			}
		default:
			return state;
	}
	
}