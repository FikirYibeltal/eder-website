import React, { Component } from 'react';
class Event extends Component{
	render(){
		return(
                <section>
        

        <div class="home-page-events">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-8 col-md-8 event-video">
                    
                    <video   controls>
                      <source src="img/aa.mp4" type="video/mp4" />
                    </video>



                </div>
                <div class="col-0 col-md-1 col-lg-1"></div>

                <div class="col-12 col-lg-3 col-md-3" >
                    <div class="featured-cause">
                        <h2 class="title-style-1">Important Documents<span class="title-under"></span></h2>

                        <div class="docs">
                            <ul>
                              <li><a href="/img/Idir Registration doc.pdf">Idir Bylaw</a></li>
                              <li><a href="">Registration Form</a></li>
                              <li><a href="/img/20190106_111814.jpg">Contact Information</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    </section>

			);
	}
}

export default Event;