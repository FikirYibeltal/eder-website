import React, { Component } from 'react';
// import Nav from './Nav.js';
import Navs from './Navs.js';
import Topnav from './Topnav.js';
import Footer from './Footer.js';
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class Eventpage extends Component {

    constructor(props){
      super(props);
      this.state={
        products:[]

      };
      
      
    }


     componentDidMount=(e)=>{
      // let token=localStorage.getItem('token');
      // let config={headers:{Authorization:`Bearer ${token}`}};
    axios.get("/getallevent")
      .then((res)=>{
        console.log(res);

        this.setState({
          products:res.data
        });
        
      });



   }


    render (){


     
         return(
            <div>
          <Topnav />
          <Navs />
          <div class="eventtop">
            <h2 class="title-style-1">Events <span class="title-under"></span></h2>
          </div>
          <Eachevent products={this.state.products} />
          <Footer />
          </div>

        );
      
        
    }
}

class Eachevent extends Component{

  render (){

    

 var product = this.props.products.map(function(product) {
        if(product.Type !=1){

            console.log(product.Image);
         var image=`img/files/${product.Image}`;
          return(
          <div class="container post-page">
            <div class="row">
              <div class="col-md-1 col-0"></div>
              <div class="col-md-3 col-12 eachpostsimage">
                <img src={image}></img>
                <h5>{product.current_times.slice(0,10)}</h5>


              </div>
              <div class="col-md-1 col-0"></div>
              <div class="col-md-6 col-12">
                <div class="post-item">
                  {ReactHtmlParser(product.Text)}
                </div>

              </div>
              <div class="col-md-1 col-0"></div>
            </div>

          </div>

           )
        }
        else{
            return;
        }
         
           });

            return(
                <div>{product}</div>

              )


     
  }
}
export default Eventpage;