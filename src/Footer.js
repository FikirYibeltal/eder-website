import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateMessage,updateName,updateEmail,updateEachMessage} from './actions/message-action';
import axios from 'axios';
class Footer extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     name:"",
        //     email:"",
        //     message:""
        // };
    }

    onSubmit=(e)=>{
        e.preventDefault();
        axios.post('/addmessage',{
            Name:this.props.name,
            Email:this.props.email,
            Message:this.props.message

        })
        .then((res,err)=>{
            console.log(err)

        })
    }
    handleName=(e)=>{
    //     this.setState({
    //         name:e.target.value
    // });
        this.props.onUpdateName(e.target.value)
    }
    handleEmail=(e)=>{
    //     this.setState({
    //         email:e.target.value
    // });
        this.props.onUpdateEmail(e.target.value);
    }
    handleMessage=(e)=>{
    //     this.setState({
    //         message:e.target.value
    // });
        this.props.onUpdateEachMessage(e.target.value);
    }
   
    

	render(){
		return(
				<footer class="main-footer">
        <div class="footer-top">   
        </div>
        <div class="footer-main">
            <div class="container">               
                <div class="row">
                    <div class="col-md-4">
                        <div class="footer-col">
                            <h4 class="footer-title">About us <span class="title-under"></span></h4>
                            <div class="footer-content">
                                <p>
                                    <strong>ECSS</strong> The purpose of the Ethiopian-Canadian Solace Society (Idir) in Edmonton (hereafter called the “Society”) is, following the longstanding Ethiopian tradition, to provide moral, logistical, and financial support to its members in the event of losing a family member by cause of death. The nature and extent of the support will be as stipulated in the bylaw herein and/or by future policies made by a quorum of the Society members. Purchasing a common burial land for the final resting place of its members is the Society’s key objective.
                                </p>
                            </div>                            
                        </div>
                    </div>
                    <div class="col-md-4">
                        
                    </div>
                    <div class="col-md-4">
                        <div class="footer-col">
                            <h4 class="footer-title">Contact us <span class="title-under"></span></h4>
                            <div class="footer-content">
                                <div class="footer-form">                                   
                                    <div class="footer-form" >
                                    
                                    <form action="" class="ajax-form">
                                        <div class="form-group">
                                            <input type="text" name="name" onChange={this.handleName} class="form-control" placeholder="Name" required></input>
                                        </div>
                                         <div class="form-group">
                                            <input type="email" name="email" onChange={this.handleEmail} class="form-control" placeholder="E-mail" required></input>
                                        </div>
                                        <div class="form-group">
                                            <textarea name="message" onChange={this.handleMessage} class="form-control" placeholder="Message" required></textarea>
                                        </div>

                                    

                                         <div class="form-group">
                                            <button type="submit" class="btn btn-submit pull-right" onClick={this.onSubmit}>Send message</button>
                                        </div>
                                        
                                    </form>

                                </div>

                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div class="clearfix"></div>



                </div>
                
                
            </div>

            
        </div>

        <div class="footer-bottom">

            <div class="container text-center">
                Copyright © 2019 ECSS
            </div>
        </div>
        
    </footer> 

			);
	}

}
const mapStateToProps=state=>({
        name:state.message.name,
        email:state.message.email,
        message:state.message.message
    });
     const mapActionsToProps={
        onUpdateName:updateName,
        onUpdateEmail:updateEmail,
        onUpdateMessage:updateMessage,
        onUpdateEachMessage:updateEachMessage
    };

export default connect(mapStateToProps,mapActionsToProps)(Footer);