import React, { Component } from 'react';
import {
  Switch,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
class About extends Component{
	render(){
		return(
                <section>
        

        <div class="section-home about-us fadeIn animated">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                  <div class="about-us-col">
                        <div class="col-icon-wrapper">
                          <img src="assets/images/icons/our-mission-icon.png" alt=""></img>
                        </div>
                        <h3 class="col-title">our purpose</h3>
                        <div class="col-details">
                          <p>The purpose of the Ethiopian-Canadian Solace Society (Idir) in Edmonton (hereafter called the “Society”) is, following the longstanding Ethiopian tradition, to provide moral, logistical, and financial support to its members in the event of losing a family member by cause of death.  The nature and extent of the support will be as stipulated in the bylaw herein and/or by future policies made by a quorum of the Society members.  Purchasing a common burial land for the final resting place of its members is the Society’s key objective.  </p>
                        </div>
                        <NavLink class="btn btn-primary" to="/about">Read More </NavLink>
                  </div>
                </div>

                <div class="col-md-6 col-sm-12">
                  <div class="about-us-col">
                        <div class="col-icon-wrapper">
                          <img src="assets/images/icons/our-mission-icon.png" alt=""></img>
                        </div>
                        <h3 class="col-title">our objective</h3>
                        <div class="col-details">
                          <p>In so far as the Society is founded to address a particular need of the Ethiopian-Canadian community in Edmonton, it will nurture a close and strong relationship with the Ethiopian-Canadian Community Association (ECCAE) in Edmonton.  The Society shall not engage in duplicative activities that are within the mandates of the ECCAE; instead, the Society will strive to support the ECCAE’s activities in so far as its bylaws and capacities permit. </p>
                          <br></br>
                        </div>
                        <NavLink class="btn btn-primary" to="/about">Read More </NavLink>
                  </div>
                </div>
                

            </div>

        </div>
      
    </div> 
    </section>


			);
	}
}

export default About;