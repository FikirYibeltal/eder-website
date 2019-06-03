import axios from 'axios';
export const PAYMENT_UPDATE='payment_action';
export function paymentAction (payment){
	return{type:PAYMENT_UPDATE,
			payload:{
				payment:payment
			}
		}
}
export function fetchPaymentApi(){
	return dispatch=>{
		axios.get('/getpaymentleftjoined')
			.then((res)=>{
				dispatch(paymentAction(res.data));
			});
	}
}