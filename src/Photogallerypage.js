import React, { Component } from 'react';
// import Nav from './Nav.js';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import Footer from './Footer.js';
import axios from 'axios';
class Photogallerypage extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        };
    }
    componentDidMount=(e)=>{
        axios.get('/getimage')
            .then((res)=>{
                console.log(res.data);
                this.setState({
                    products:res.data
                });

            });
    }

	render(){
        var eachimage=this.state.products.map((product)=>{
            if(product.Type==1){
                return <Imageitem product={product} />
            }
        })
		return(
                <div>
                <Topnav />
                <Navs />

                <section class="photogallery">

            <div class="main-container">
                
                <div class="our-team animate-onscroll fadeIn">

            <div class="container">

                <h2 class="title-style-1">Photo Gallery <span class="title-under"></span></h2>

                <div class="row">

                {eachimage}

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
class Imageitem extends Component {
    render (){
        var images=`img/files/${this.props.product.Image_id}`;
        var date= this.props.product.Created_date.slice(0,10);
        return (
                
                   <div class="col-md-4 col-sm-6 photo">
                        <div class="team-member">
                            <div class="thumnail">
                                <img src={images} alt="" class="cause-img"></img>
                            </div>
                            <h4 class="member-name"><a href="#">Title : Edir Event</a></h4>
                            <div class="member-position">
                                Date: {date}
                            </div>
                        </div>
                    </div>

                    
                
  

               


        );
    }
}

export default Photogallerypage;