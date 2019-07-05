import React, { Component } from 'react';
import {Route,withRouter} from "react-router-dom";

import Footer from './Footer.js';
import Homepage from './Homepage.js';
import Aboutpage from './Aboutpage.js';
import Photogallerypage from './Photogallerypage.js'
import Contactpage from './Contactpage.js'
import Eventpage from './Eventpage.js';
import Videogallerypage from './Videogallerypage.js';
import Loginpage from './Loginpage.js';
import Navs from './Navs.js';
// import Testpage from './Testpage.js';

import Activity from './Activity.js';
import User from './User.js';
import Payment from './Payment.js';
import Addpost from './Addpost.js';
import Posts from './Posts.js';
import Imagetogallery from './Imagetogallery.js';
import Eachpayment from './Eachpayment.js'
import Accessdenied from './Accessdenied.js';
import UserProfile from './LoginEnclosure.js';

class App extends Component {

    componentWillMount=(e)=>{
    // console.log(UserProfile.getNav());
    let publicpath=['home','about','photogallery','event','contact'];
    if(localStorage.getItem('path')){
        if(publicpath.includes(localStorage.getItem('path'))){
            if(localStorage.getItem('path')=='home'){
                  this.props.history.push('');
               }else{
                  this.props.history.push(localStorage.getItem('path'));
               }
          }
    }
    
    
    // console.log('app e');
    // console.log(e);
     
    // if((!UserProfile.getName() || UserProfile.getNav()=="") && UserProfile.getNav()!='home'){
    //     let path = UserProfile.getNav();
    //   this.props.history.push(path);
    // }
      
  }
  render() {
    return (
      <div>

      			
         
         

        
           
          
            <Route exact path="/" component={Homepage}/>
            <Route path="/about" component={Aboutpage}/>
            <Route path="/photogallery" component={Photogallerypage}/>
            <Route path="/videogallery" component={Videogallerypage}/>
            <Route path="/event" component={Eventpage}/>
            <Route path="/contact" component={Contactpage}/>
            <Route path="/login" component={Loginpage}/>
            
            <Route path="/activity" component={Activity}/>
            
            <Route path="/user" component={User}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/addpost" component={Addpost}/>
            <Route path="/posts" component={Posts}/> 
            <Route path="/uploadimage" component={Imagetogallery} />
            <Route path="/accessdenied" component={Accessdenied} />
            <Route path="/eachpayment" component={Eachpayment} />   
       
            
          
       
      </div>
    );
  }
}

export default withRouter(App);
