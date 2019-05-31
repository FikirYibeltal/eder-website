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
        products:[],
        user:[]

      };
     
      
    }
    componentWillMount=(e)=>{
    console.log(UserProfile.getName());
    if(!UserProfile.getName() || UserProfile.getName()==""){
        let path = `accessdenied`;
      this.props.history.push(path);
    }
    var urls=`/user/${UserProfile.getId()}`;
      axios.get(urls)
      .then((res)=>{
          console.log(res);
          this.setState({
            user:res.data
          })
          console.log(this.state.user);
      });
      
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
          <div class="belownav"></div>
          <h2 class="title-style-1">Posts from Board <span class="title-under"></span></h2>
          <Eachposts products={this.state.products} user={this.state.user}/>
          </div>

        );
      
        
    }
}

class Eachposts extends Component{

  render (){

    
    console.log('user');
    console.log(this.props.user);
  let user=this.props.user
 var product = this.props.products.map(function(product) {
        
        console.log(product.Too);
        if(user.length!=0){

            if(user[0].Type==0 || user[0].Type==product.Too || product.Too==3){
             console.log(product.Image);
         var image=`img/files/${product.Image}`;
          return(
          <div class="container post-page">
            <div class="row">
              <div class="col-md-1 col-0"></div>
              <div class="col-md-3 col-12 eachpostsimage" >
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


      }else{

        return;
      }

        } else{
          return;
        }    

        
    
        
           });

            return(
                <div>{product}</div>

              )
      }


     
  
}
export default withRouter(Posts);
