import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Autocomplete from "./Autocomplete";

import Navadmin from './Navadmin.js';
import './App.css';
import {withRouter} from 'react-router-dom';
import UserProfile from './LoginEnclosure.js';
class Payment extends Component {
   constuctor() {
          this.routeChange = this.routeChange.bind(this);
       }
  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      
    ];
    this.state.usernames=[];
    this.state.nameandid=[];
    this.state.description=[];
    this.state.activityandid=[];
    this.state.payment=[];
    this.state.users=[];
    this.state.activity=[];
    
    console.log(UserProfile.getName());
    console.log(UserProfile.getId());


    axios.get("/getpayment")
      .then((res)=>{
        
         this.state.payment=res.data;
         // console.log(payment);
        this.setState({
          products:res.data
        });
        


      });
       axios.get("/getalluser")
      .then((res)=>{
        

        
        this.state.users=res.data;
        // console.log(users);
        res.data.map((item)=>{
            this.state.usernames.push(item.Name);
        });
         res.data.map((item)=>{
           var index={Name:item.Name,User_id:item.User_id};
            this.state.nameandid.push(index);
        });
        // console.log(this.state.usernames);
        // console.log(this.state.nameandid);
        
      });
      
      axios.get("/getactivity")
      .then((res)=>{
        this.state.activity=res.data;
       
         res.data.map((item)=>{
            this.state.description.push(item.Description);
            // console.log(this.state.description);
        });
         res.data.map((item)=>{
           var index={Activity_id:item.Activity_id,Description:item.Description};
            this.state.activityandid.push(index);
        });
         
        var paymentexpanded=this.state.payment.map((payments)=>{
            
            for (var i=0;i<this.state.users.length;i++){
              if (parseInt(payments.User_id) == parseInt(this.state.users[i].User_id)){
                
                payments["Name"]=this.state.users[i].Name;
                // payments["Password"]=this.state.users[i].Password;
              }
            }
            return payments;
         });
        var paymentexpandeds=paymentexpanded.map((payments)=>{
            
            for (var i=0;i<this.state.activity.length;i++){
               // console.log(payments.Activity_id);
               // console.log(this.state.activity[i].Activity_id);
              if (parseInt(payments.Activity_id) == parseInt(this.state.activity[i].Activity_id)){
               //  console.log(payments.Activity_id);
               // console.log(this.state.activity[i].Activity_id);
                payments["Description"]=this.state.activity[i].Description;
              }
            }
            return payments;
         });
        // console.log(paymentexpandeds);
        this.setState({
          products:paymentexpandeds
        });
        // console.log(this.state.payment);
        
       });

  }
  componentWillMount=(e)=>{
    console.log(UserProfile.getName());
    if(!UserProfile.getName() || UserProfile.getName()==""){
        let path = `accessdenied`;
      this.props.history.push(path);
    }
      
  }

  	 

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
  	// console.log(product);
  	
  	axios.delete(`/deletepayment/${product.Payment_id}`)
			.then((res)=>{
				// console.log('delete data');
				console.log(res);
			});
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
  	while(true){
  	var bool=true;
  	var id = (Math.floor(Math.random() * 999999));
  	this.state.products.map((item)=>{
  		if(id> 1000 && id != item.Payment_id){
  			bool=true;
  		}else{
  			bool=false;
  		}


  	});
     
  	if (bool==true){
  		break;
  	}
     
  	}
    var product = {
      Payment_id: id,
      Name: "",
      Description:"",
      User_id:0,
      Activity_id: 0,
      Amount:"",
     
    }
    this.state.products.unshift(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    // console.log(item);
  		
var products = this.state.products.slice();
	// console.log(products);

  var newProducts = products.map(function(product) {

    for (var key in product) {
    	// console.log("hello   "+key);
      if (key == item.name && parseInt(product.Payment_id) == parseInt(item.id)) {
        product[key] = item.value;


      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };


  handleProductTables(evt) {
  
    var item = {
      id: evt.id,
      name: evt.name,
      value: evt.value
    };
 
 

     // console.log(item);
      
var products = this.state.products.slice();
  // console.log(products);

  var newProducts = products.map(function(product) {

    for (var key in product) {
      // console.log("hello   "+key);
      if (key == item.name && parseInt(product.Payment_id) == parseInt(item.id)) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };

  updatedatabase(e){
    var User_id;
    var Activity_id;
  	// console.log(this.state.products);
  	this.state.products.map((item)=>{

      for (var items in this.state.nameandid){
        if(this.state.nameandid[items].Name==item.Name){
          User_id=this.state.nameandid[items].User_id;
        }
      }
      for (var items in this.state.activityandid){
        if(this.state.activityandid[items].Description==item.Description){
          Activity_id=this.state.activityandid[items].Activity_id;
        }
      }
      console.log(User_id);
      console.log(Activity_id);
  		if(parseInt(item.Payment_id)<1000){
  			
  			axios.post('/updatepayment', {
			    Payment_id: item.Payment_id,
			    User_id: User_id,
			    Activity_id: Activity_id,
			    Amount: item.Amount,
			    
			  }).then((res,err)=>{
			  	console.log(err);
			  });
			  
  		}
  		else{
  			axios.post('/addpayment', {
			    
			    User_id: User_id,
          Activity_id: Activity_id,
          Amount: item.Amount,
			  }).then((res,err)=>{
			  	console.log(err);
			  });
  			
  		}

  	});


  }

  render() {

    return (
      <div>
        <Navadmin />
        <div class="belownav"></div>
        <h2 class="title-style-1">Payment List <span class="title-under"></span></h2>
        <ProductTable description={this.state.description} usernames={this.state.usernames} onUpdateDatabase={this.updatedatabase.bind(this)} onUserInput={this.handleUserInput.bind(this)}  onProductTableUpdates={this.handleProductTables.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}
// class SearchBar extends React.Component {
//   handleChange() {
//     this.props.onUserInput(this.refs.filterTextInput.value);
//   }
//   render() {
//     return (
//       <div>

//         <input type="text" placeholder="Search Name..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

//       </div>

//     );
//   }

// }

class ProductTable extends React.Component {
	 handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  	}

      updatedatabase=(e)=>{

    	this.props.onUpdateDatabase(e)



    }
    saveuser = () => {
    confirmAlert({
      title: 'Confirm to save',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{this.updatedatabase();}
        },
        {
          label: 'No',
          onClick: () =>{}
        }
      ]
    })
  };


  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var onProductTableUpdates = this.props.onProductTableUpdates;
    var usernames=this.props.usernames;
    var description=this.props.description;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
     console.log('productss');
     
     var product = this.props.products.map(function(product) {
        console.log("productssss");
        console.log(product);
        if (product.Name){
       if (product.Name.indexOf(filterText) === -1) {
          
          // console.log(product);
         return;
       }
     }
      return (<ProductRow description={description} usernames={usernames} onProductTableUpdates={onProductTableUpdates} onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.Payment_id}/>);
     });

    return (
      <div>
      <div class="userbutton container-fluid">
        <div class="row">
          <div class="col-md-4 cols-sm-12">
            <input type="text" maxlength="4" size="4" placeholder="Search Name..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
          </div>
          <div class="col-md-4 col-sm-0"></div>
          <div class="col-md-4 col-sm-12">
            <button type="button" onClick={this.props.onRowAdd} className="adduser btn btn-success ">Add Payment</button>
            <button type="button" onClick={this.saveuser} className="btn btn-success ">Save</button>
          </div>
        </div>
      </div>
 		<div>     
        <div class="formclass">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>User Name</th>
              <th>Description</th>
              <th>Amount Paid</th>
              
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
        </div>
        </div>
      </div>
    );

  }

}

class ProductRow extends React.Component {
	
  onDelEvent=()=> {
    this.props.onDelEvent(this.props.product);

  }
  deletebutton=()=>{
  	confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{this.onDelEvent();}
        },
        {
          label: 'No',
          onClick: () =>{}
        }
      ]
    });
  	
  }
  render() {
  	
  	var useridfield;
  	if (this.props.product.Payment_id){ 
        useridfield=<EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "Payment_id",
          value: this.props.product.Payment_id,
          id: this.props.product.Payment_id
        }}/>;
        }else{
        	useridfield=<td><input type="text" name="userid" value="" disabled /></td>;
        }
        // console.log(this.props.product.Description)
    return (
	   
      <tr className="eachRow">
     	{useridfield}

     
   
        <Autocomplete
        suggestions={this.props.usernames}

        onProductTableUpdates={this.props.onProductTableUpdates} cellData={{
          type: "Name",
          value: this.props.product.Name,
          id: this.props.product.Payment_id
        }}
      />
      <Autocomplete
        suggestions={this.props.description}

        onProductTableUpdates={this.props.onProductTableUpdates} cellData={{
          type: "Description",
          value: this.props.product.Description,
          id: this.props.product.Payment_id
        }}
      />
       
         <EditableCells onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Amount",
          value: this.props.product.Amount,
          id: this.props.product.Payment_id
         }}/>
        
        
        <td className="del-cell">
          <input type="button" onClick={this.deletebutton} value="Delete" className="del-btn btn btn-danger"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input disabled type='text' size="10" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} defaultValue={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}

class EditableCells extends React.Component {

  render() {
    return (
      <td>
        <input type='text' size="10" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} defaultValue={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}


export default withRouter(Payment);