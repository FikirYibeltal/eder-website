import React, { Component } from 'react';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import Footer from './Footer.js';
class Aboutpage extends Component{
	render(){
		return(
                <div>
                <Topnav />
                <Navs />
               
        <section >
        <div class="container aboutpage">
            <div class="row">
                <div class="col-md-2 col-sm-0"></div>
                <div class="col-md-8 col-sm-12">
                    <h2 class="title-style-1">About Us <span class="title-under"></span></h2>

                    <div>
                        <p> The purpose of the Ethiopian-Canadian Solace Society (Idir) in Edmonton (hereafter called the “Society”) is, following the longstanding Ethiopian tradition, to provide moral, logistical, and financial support to its members in the event of losing a family member by cause of death.  The nature and extent of the support will be as stipulated in the bylaw herein and/or by future policies made by a quorum of the Society members.  Purchasing a common burial land for the final resting place of its members is the Society’s key objective.</p>
                        <p>In so far as the Society is founded to address a particular need of the Ethiopian-Canadian community in Edmonton, it will nurture a close and strong relationship with the Ethiopian-Canadian Community Association (ECCAE) in Edmonton.  The Society shall not engage in duplicative activities that are within the mandates of the ECCAE; instead, the Society will strive to support the ECCAE’s activities in so far as its bylaws and capacities permit. </p>
                    </div>
                </div>
                <div class="col-md-2 col-sm-0"></div>
            </div>
            </div>
            <div class="main-container">
                
                <div class="our-team animate-onscroll fadeIn">

            <div class="container ourteam">

                <h2 class="title-style-1">Board Members <span class="title-under"></span></h2>

                <div class="row">
                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/a.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Dr Shiferaw Adilu</a></h4>
                            <div class="member-position">
                                Chairman
                            </div>
                        </div> 
                    </div>

                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/d.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Tessera Mogess</a></h4>
                            <div class="member-position">
                                vice Chairman
                            </div>
                        </div> 
                    </div>
                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/e.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Teshome Kebede</a></h4>
                            <div class="member-position">
                                Secretary
                            </div>
                        </div> 
                    </div>
                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/b.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a  href="#">Beneyam Zeleke</a></h4>
                            <div class="member-position">
                                Treasurer
                            </div>
                        </div> 
                    </div>

                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/c.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Sisay Moltotal</a></h4>
                            <div class="member-position">
                                Board Member
                            </div>
                        </div> 
                    </div>
                    <div class="col-md-4 col-sm-6 eachboard">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src="img/f.jpg" alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Eprem Bekele</a></h4>
                            <div class="member-position">
                                Board Member
                            </div>
                        </div> 
                    </div>
  

                </div> 

            </div>

        </div>

            </div>

     

    </section>

                <Footer />
                </div>

			);
	}
}

export default Aboutpage;