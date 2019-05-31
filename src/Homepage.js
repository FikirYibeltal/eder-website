import React, { Component } from 'react';
import Navs from './Navs.js';
import Footer from './Footer.js';
import Slickpart from './homepage/Slickpart.js';
import About from './homepage/About.js';
import Event from './homepage/Event.js';
import Topnav from './Topnav.js';
import './App.css';
class Homepage extends Component{
	render(){
		return(
				<div>
					<Topnav />
					<Navs />
                    <Slickpart />
                    <About />
                    <Event />
                    <Footer />
                    

                </div>

			);
	}
}

export default Homepage;