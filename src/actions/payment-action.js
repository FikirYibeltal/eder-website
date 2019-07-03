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
	let token=localStorage.getItem('token');
    let config={headers:{Authorization:`Bearer ${token}`}};
	return dispatch=>{
		axios.get('/api/getpaymentleftjoined',config)
			.then((res)=>{
				console.log('getpaymentleftjoined');
				console.log(res.data);
				dispatch(paymentAction(res.data));
			});
	}
}