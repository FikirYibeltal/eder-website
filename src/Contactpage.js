import React, { Component } from 'react';
// import Nav from './Nav.js';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import Footer from './Footer.js';
class Contactpage extends Component{
	render(){
		return(
                <div>
                    <Topnav />
                     <Navs />
                     
                    <section>

            <div class="main-container">
                
                <div class="our-team animate-onscroll fadeIn">

            <div class="container">

                <h2 class="title-style-1"> Contact Us<span class="title-under"></span></h2>

                
  

                </div> 

                    <div class="container">

            <div class="row">

                <div class="col-md-7 col-sm-12 col-form">

                    <h2 class="title-style-2">CONTACT FORM <span class="title-under"></span></h2>

                    <form action="php/mail.php" class="contact-form ajax-form">

                        <div class="row">

                            <div class="form-group col-md-6">
                                <input type="text" name="name" class="form-control" placeholder="Name*" required></input>
                            </div>

                             <div class="form-group col-md-6">
                                <input type="email" name="email" class="form-control" placeholder="E-mail*" required></input>
                            </div>
                            
                        </div>

                        <div class="form-group">
                            <textarea name="message" rows="5" class="form-control" placeholder="Message*" required></textarea>
                        </div>

                        <div class="form-group alerts">
                        
                            <div class="alert alert-success" role="alert">
                              
                            </div>

                            <div class="alert alert-danger" role="alert">
                              
                            </div>
                            
                        </div>  

                         <div class="form-group">
                            <button type="submit" class="btn btn-primary pull-right">Send message</button>
                        </div>

                        <div class="clearfix"></div>

                    </form>

                </div>

                <div class="col-md-4  col-md-offset-1 col-contact col-contacts">

                    <h2 class="title-style-2"> ECSS CONTACTS <span class="title-under"></span></h2>
                   

                    <div class="contact-items">

                        <ul class="list-unstyled contact-items-list">
                            <li class="contact-item"> <span class="contact-icon"> <i class="fa fa-map-marker"></i></span> 10585 115Street NW, Edmonton, Alberta</li>
                            <li class="contact-item"> <span class="contact-icon"> <i class="fa fa-phone"></i></span> +1 780-802-7329</li>

                            <li class="contact-item"> <span class="contact-icon"> <i class="fa fa-envelope"></i></span> teshkt@yahoo.com</li>
                        </ul>
                    </div>

                    
                    
                </div>

            </div> 


        </div>
        

            </div>

        </div>

            

     

    </section>

    <div id="contact-map" class="contact-map">
        
    </div>

                < Footer />

                </div>

			);
	}
}

export default Contactpage;