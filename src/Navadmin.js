import React, {Component} from 'react';
import {
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import UserProfile from './LoginEnclosure.js';
import axios from 'axios';

class Navadmin extends Component{

		constuctor() {
		  		this.routeChange = this.routeChange.bind(this);
		   }
		 constructor(props){
		 	super(props);
		 	
		 }
		
		state={
			
				users:"nav-item",
				activity:"nav-item",
				payment:"nav-item",
				post:"nav-item",

			username:"",
			user:[]
		}
		componentWillMount=(e)=>{
			console.log(this.props.authenticateduser);
			var name=this.props.authenticateduser[0].Name.charAt(0).toUpperCase();
			this.setState({
      			username:name
      		});      	 
	 }

		handleclick=(e)=>{
			localStorage.setItem('path',e);
		}

		onclick=(e)=>{

				e.preventDefault();
				localStorage.removeItem('token');
				localStorage.setItem('path','');
				this.props.history.push('');
				
	      //  		if((!localStorage.getItem('publicpath') || UserProfile.getNav()=="") && UserProfile.getNav()!='home'){
			    //     let path = UserProfile.getNav();
			    //   	this.props.history.push(path);
			    // }else{
			    // 	let path = ``;
    			// 	this.props.history.push(path);
			    // }
	       		
	   }
	

	render(){
		var admin;
		var x=[];
		//console.log('state');
		//console.log(this.state.user);
		//console.log('statess')
		let user=this.props.authenticateduser;
		 if(user.length!=0){
		 				//console.log('hello1');
						
						  if(user[0].Type==0){
				 admin=<div class="collapse navbar-collapse main-menus" id="navbarSupportedContent">
			            <ul class="navbar-nav ml-auto">
			              <li onClick={()=>this.handleclick("user")} class={this.state.users}>
			                <NavLink to="/user">User</NavLink>
			              </li>
			              <li onClick={()=>this.handleclick("activity")} class={this.state.activity}>
			                <NavLink to="/activity">Activity</NavLink>
			              </li>
			           
			              

			                <li class="nav-item dropdown">
						      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
						        Payment
						      </a>
						      <div class="dropdown-menu">
						        
					             <NavLink to="/payment"  onClick={()=>this.handleclick("payment")} class={this.state.payment}>Update Payments</NavLink>
					             
						        <NavLink to="/eachpayment"  onClick={()=>this.handleclick("eachpayment")} class={this.state.payment}>Your Payments</NavLink>
						        
						      </div>
						    </li>

						    <li class="nav-item dropdown">
						      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
						        Post
						      </a>
						      <div class="dropdown-menu">
						        
					             <NavLink to="/addpost"  onClick={()=>this.handleclick("addpost")} class={this.state.post}>Add Post</NavLink>
					             
						        <NavLink to="/posts"  onClick={()=>this.handleclick("posts")} class={this.state.post}>See Posts</NavLink>
						        <NavLink to="/uploadimage"  onClick={()=>this.handleclick("post")} class={this.state.post}>Upload Image to Gallery</NavLink>
						       
						      </div>
						    </li>
			                  </ul>
			                  
			          </div>




		   }else{


				 admin=<div class="collapse navbar-collapse main-menus" id="navbarSupportedContent">
			            <ul class="navbar-nav ml-auto">
			              <li class="nav-item">
			                <NavLink to="/eachpayment"  onClick={()=>this.handleclick("eachpayment")} class={this.state.payment}>Your Payments</NavLink>
			              </li>
			              <li class="nav-item">
			                <NavLink to="/posts"  onClick={()=>this.handleclick("posts")} class={this.state.post}>See Posts</NavLink>
			              </li>
			           
			                  </ul>
			                  
			          </div>

		   }


		 }else{
		 	//console.log('hello2');
		 }


		

		return(
				

				<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
			         
			          <a class="navbar-brand branded nav-text" href=""><img src="img/output-onlinepngtools.png" alt=""></img><h3>የኢትዮዽያዉያን - ካናዳዉያን እድር በኤድመንተን</h3></a>

			         {admin}
			          <div class="dropdown logout">
								  <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								  <a data-letters={this.state.username}></a>
								  </button>
								  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								    <a class="dropdown-item" href="#" onClick={this.onclick}>Logout</a>
								   
								  </div>
								</div>
			          
			         
			      
			          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			            <span class="navbar-toggler-icon"></span>
			          </button>
			        </nav>

			


			);
	}
}

export default withRouter(Navadmin);
 