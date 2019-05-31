import React, { Component } from 'react';
// import Nav from './Nav.js';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import Footer from './Footer.js';
class Videogallerypage extends Component{
    render(){
        return(

        	<div>
        	<Topnav />
        	<Navs />
        	
        	<Footer />

        	</div>

            );

    }


}



export default Videogallerypage;