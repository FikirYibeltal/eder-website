import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Navadmin from './Navadmin.js';
import {withRouter} from 'react-router-dom';
import UserProfile from './LoginEnclosure.js';
class Posts extends Component {
     constuctor() {
          this.routeChange = this.routeChange.bind(this);
       }
    constructor(props){
      super(props);
      this.state={
        products:[]

      };
      
    }
    componentWillMount=(e)=>{
    console.log(UserProfile.getName());
    if(!UserProfile.getName() || UserProfile.getName()==""){
        let path = `accessdenied`;
      this.props.history.push(path);
    }
      
  }

     componentDidMount=(e)=>{
    axios.get("/getallpost")
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
          <Navadmin />
          <Eachposts products={this.state.products} />
          </div>

        );
      
        
    }
}

class Eachposts extends Component{

  render (){

    

 var product = this.props.products.map(function(product) {
         console.log(product.Image);
         var image=`img/files/${product.Image}`;
          return(
          <div class="container post-page">
            <div class="row">
              <div class="col-md-1 col-0"></div>
              <div class="col-md-3 col-12">
                <img src={image}></img>



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
           });

            return(
                <div>{product}</div>

              )


     
  }
}
export default withRouter(Posts);
