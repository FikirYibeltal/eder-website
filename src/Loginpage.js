import React, { Component } from 'react';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import UserProfile from './LoginEnclosure.js';
import {
  Switch,
  Route,
  NavLink,
  HashRouter,
  withRouter
} from "react-router-dom";
import axios from 'axios';

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
		console.log(e);
		axios.get(`/getalluser`)
		.then(res=>{
		var item;
		 for (item in res.data){
	       // console.log(res.data[item].Name);
	       if (this.state.email==res.data[item].Email && this.state.password == res.data[item].Password){
	       		 // console.log(res.data[item].User_id);
	       		UserProfile.setName(this.state.email);
	       		UserProfile.setId(res.data[item].User_id);
	       		// console.log(UserProfile.getName());
	       		// console.log(UserProfile.getId());
	       		let path = `posts`;
    			this.props.history.push(path);
	   }
	}

		})
		.catch(function (error) {
    		console.log(error);
 	 });
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