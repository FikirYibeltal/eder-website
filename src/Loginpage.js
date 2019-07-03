import React, { Component } from 'react';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import UserProfile from './LoginEnclosure.js';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import verifytoken from './extra/Verifytoken';
class Loginpage extends Component{
		
		 constuctor() {
		  		this.routeChange = this.routeChange.bind(this);
		   }
		state={
			email:"",
			password:""
		};
	
	handleClick=(e)=>{
		e.preventDefault();
		// console.log(e);
		var token=localStorage.getItem('token');
		console.log(token);
		if(token){
				var decoded=verifytoken(token);
				// console.log(decoded);
				if(decoded){
					console.log(decoded);
					let path = `posts`;
    			 	this.props.history.push(path);
    			 	localStorage.setItem('path',path);
    			 }else{
    			 	let path = `login`;
    			 	this.props.history.push(path);
    			 	localStorage.setItem('path',path);
    			 }
				// var current_time = new Date().getTime() / 1000;
				
				// var decoded = decode(token);
				// if(current_time<decoded.exp){
				// 	console.log(decoded);
				// 	UserProfile.setName(decoded.user.Name);
	   //     			UserProfile.setId(decoded.user.User_id);
	   //      		let path = `posts`;
    // 			 	this.props.history.push(path);
				// }else{

				// }
				
		}else{
			axios.post('/login',{
				Email:this.state.email,
				Password:this.state.password})
				    .then((res,err)=>{
					let token=undefined;
					if (res.data.length!=0){
						token=`${res.data.token}`;
						localStorage.setItem('token',`${res.data.token}`);
					}else{
						console.log('it doesnot exist');
					}
					if (token){
							var decoded=verifytoken(token);
							if(decoded){
							console.log(decoded);
							let path = `posts`;
		    			 	this.props.history.push(path);
		    			 	localStorage.setItem('path',path)
		    			 }else{
		    			 	let path = `login`;
		    			 	this.props.history.push(path);
		    			 	localStorage.setItem('path',path);
		    			 }
						
							
					}
				
					})
					.catch((err)=>{
						console.log(err);
					})
		}
		 
	// 	axios.get(`/getalluser`)
	// 	.then(res=>{
	// 	var item;
	// 	 for (item in res.data){
	//         console.log(res.data[item].Name);
	//        if (this.state.email==res.data[item].Email && this.state.password == res.data[item].Password){
	//        		  console.log(res.data[item].User_id);
	//        		UserProfile.setName(this.state.email);
	//        		UserProfile.setId(res.data[item].User_id);
	//         		let path = `posts`;
 //    			 this.props.history.push(path);
	//    }
	// }

	// 	})
	// 	.catch(function (error) {
 //    		console.log(error);
 // 	 });
	}
	handleEmail=(e)=>{
		this.setState({
			email:e.target.value
	});
	}	
	handlePassword=(e)=>{
		this.setState({
			password:e.target.value
		});
	}
	
    render(){
        return(

        	<div>
        		<Topnav />
        		<Navs />
        		<div class="container-fluid loginpage">
				    <div class="row">
				      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto loginform">
				        <div class="card card-signin my-5">
				          <div class="card-body">
				            <h5 class="card-title text-center">Sign In</h5>
				            <form class="form-signin">
				              <div class="form-label-group">
				                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus onChange={this.handleEmail}></input>
				                <label for="inputEmail">Email address</label>
				              </div>

				              <div class="form-label-group">
				                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required onChange={this.handlePassword}></input>
				                <label for="inputPassword">Password</label>
				              </div>

				              <div class="custom-control custom-checkbox mb-3">
				                <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
				                <label class="custom-control-label" for="customCheck1">Remember password</label>
				              </div>
				              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleClick}>Sign in</button>
				              <hr class="my-4"></hr>
				              
				            </form>
				          </div>
				        </div>
				      </div>
				    </div>
 				 </div>

        	</div>

            );

    }


}



export default withRouter(Loginpage);