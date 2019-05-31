import React, {Component} from 'react';
import {
  Switch,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import UserProfile from './LoginEnclosure.js';

class Navs extends Component{

		constructor(props){

			super(props);
		}
		state={
			
				about:"nav-item",
				home:"nav-item",
				photogallery:"nav-item",
				videogallery:"nav-item",
				event:"nav-item",
				contact:"nav-item",

			
			active: "nav-item active",
			nonactive: "nav-item"
		}
		componentWillMount=(e)=>{
			console.log(UserProfile.getNav());
      	if(UserProfile.getNav()==""){
      		this.setState({
      			home:"nav-item active"
      		})
      	}else{
      		this.setState({
      			[UserProfile.getNav()]:"nav-item active"
      		})
      	}
	 }

		handleclick=(e)=>{
			console.log(e);
			UserProfile.setNav(e);
			console.log("enclosure");
			console.log(UserProfile.getNav());
			for (var item in this.state){

				console.log(item)
				if (item == e){
					console.log("match");
					console.log(item);

					var stateObject = function() {
				      var returnObj = {};
				      returnObj[item] = "nav-item active";
				         return returnObj;
				    }.bind(e)();

				    this.setState( stateObject ); 
					// this.setState({
					// 	item.value:"nav-item active"
					// });
				} 
				// else if(item=="active"){


				// }else{
				// 	this.setState({
				// 		item:"nav-item"
				// 	})
				// }
			}
			console.log(this.state);
		}

	render(){
		return(
				

				<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
			         
			          <a class="navbar-brand branded nav-text" href=""><img src="img/output-onlinepngtools.png" alt=""></img><h3>የኢትዮዽያዉያን - ካናዳዉያን እድር በኤድመንተን</h3></a>

			          <div class="collapse navbar-collapse main-menus" id="navbarSupportedContent">
			            <ul class="navbar-nav ml-auto">
			              <li onClick={()=>this.handleclick("home")} class={this.state.home}>
			                <NavLink to="/">Home</NavLink>
			              </li>
			              <li onClick={()=>this.handleclick("about")} class={this.state.about}>
			                <NavLink to="/about">About Us</NavLink>
			              </li>
			              <li  onClick={()=>this.handleclick("photogallery")} class={this.state.photogallery}>
			                <NavLink to="/photogallery">Photo Gallery</NavLink>
			              </li>
			              
			              <li onClick={()=>this.handleclick("event")} class={this.state.event}>
			                <NavLink to="/event">Events</NavLink>
			              </li>
			              <li onClick={()=>this.handleclick("contact")} class={this.state.contact}>
			                <NavLink to="/contact">Contact</NavLink>
			                </li>
			                  </ul>
			                  
			          </div>
			          <div class="signindiv">
			            <button class="btn btn-outline-success my-2 my-sm-0 signin" ><NavLink to="/login">Sign In</NavLink></button>
			          </div>
			          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			            <span class="navbar-toggler-icon"></span>
			          </button>
			        </nav>

			


			);
	}
}

export default Navs;