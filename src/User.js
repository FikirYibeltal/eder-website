import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Navadmin from './Navadmin.js';
import UserProfile from './LoginEnclosure.js';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchApi,updateUser } from './actions/user-action';
import verifytoken from './extra/Verifytoken';
class User extends Component {
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
    this.state.authenticateduser=[];

  }
  componentWillMount=(e)=>{
    //console.log(UserProfile.getName());
    let token=localStorage.getItem('token');
      if(verifytoken(token)){
           let users=verifytoken(token);
          let user=this.state.authenticateduser;
           this.setState({
               authenticateduser:[...user,users]
           });
      }else{

        let path = `accessdenied`;
        this.props.history.push(path);

      }


    // if(!UserProfile.getName() || UserProfile.getName()==""){
    //     let path = `accessdenied`;
    //   this.props.history.push(path);
    // }
     this.props.onFetchApi(); 
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    let token=localStorage.getItem('token');
    let config={headers:{Authorization:`Bearer ${token}`}};
  	// console.log(product);
  	// console.log('/deleteuser/'+product.User_id);
  	axios.delete(`/api/deleteuser/${product.User_id}`,config)
			.then((res)=>{
				//console.log('delete data');
				//console.log(res);
			});
    var index = this.props.products.users.indexOf(product);
    let products=this.props.products.users;
    products.splice(index, 1);
    this.props.onUpdateUser(products);
    // this.setState(this.state.products);
  };

  handleAddEvent(evt) {
  	while(true){
  	var bool=true;
  	var id = (Math.floor(Math.random() * 999999));
  	this.state.products.map((item)=>{
  		if(id> 1000 && id != item.User_id){
  			bool=true;
  		}else{
  			bool=false;
  		}


  	});
     
  	if (bool==true){
  		break;
  	}
     
  	}
    var pas=id+"";
    var product = {
      User_id: id,
      Name: "",
      Email: "",
      Mobile:"",
      Password: pas,
      Type: 1
    }
    let products=this.props.products.users;
    products.unshift(product);
    this.props.onUpdateUser(products);
    // this.state.products.unshift(product);
    // this.setState(this.state.products);


  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    // console.log(item);
  		
var products = this.props.products.users.slice();
	// console.log(products);

  var newProducts = products.map(function(product) {

    for (var key in product) {
    	// console.log("hello   "+key);
      if (key == item.name && parseInt(product.User_id) == parseInt(item.id)) {
        product[key] = item.value;

      }
    }
    return product;
  });
  this.props.onUpdateUser(newProducts);
  //   this.setState({products:newProducts});
  
   };

  updatedatabase(e){
    let token=localStorage.getItem('token');
    let config={headers:{Authorization:`Bearer ${token}`}};
  	// console.log(this.state.products);
  	this.props.products.users.map((item)=>{
  		if(parseInt(item.User_id)<1000){
  			
  			axios.post('/api/updateuser',{
			    User_id: item.User_id,
			    Name: item.Name,
			    Email: item.Email,
			    Mobile: item.Mobile,
			    Password: item.Password,
			    Type: item.Type
			  },config).then((res,err)=>{
			  	//console.log(err);
			  });
			  
  		}
  		else{
  			axios.post('/api/adduser',{
			    
			    Name: item.Name,
			    Email: item.Email,
			    Mobile:item.Mobile,
			    Password: item.Password,
			    Type: parseInt(item.Type)
			  },config).then((res,err)=>{
			  	//console.log(err);
          console.log(err)
			  });
  			
  		}

  	});


  }

  render() {
    return (
      <div>
        <Navadmin authenticateduser={this.state.authenticateduser} />
        <div class="belownav"></div>
        <h2 class="title-style-1">Members List <span class="title-under"></span></h2>
        <ProductTable  onUpdateDatabase={this.updatedatabase.bind(this)} onUserInput={this.handleUserInput.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.props.products.users} filterText={this.state.filterText}/>
      </div>
    );

  }

}



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
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    if(this.props.products){
        var product = this.props.products.map(function(product) {
        if (product.Name.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
    }
    

    return (
      <div>
      <div class="userbutton container-fluid">
        <div class="row">
          <div class="col-md-4 cols-sm-12">
            <input type="text" maxlength="4" size="4" placeholder="Search Name..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
          </div>
          <div class="col-md-4 col-sm-0"></div>
          <div class="col-md-4 col-sm-12">
            <button type="button" onClick={this.props.onRowAdd} className="adduser btn btn-success ">Add User</button>
            <button type="button" onClick={this.saveuser} className="btn btn-success ">Save</button>
          </div>
        </div>
      </div>
 		<div>     
        <div class="formclass">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Password</th>
              <th>User Type</th>
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
	usertypes=(input)=>{
	 	if (input==0){
	 		return "Admin";
	 	}
	 	else if(input==1){
	 		return "Member";
	 	}
	 }
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
  	var usertypess=this.usertypes(this.props.product.Type);
  	//console.log(usertypess);
  	var useridfield;
  	if (this.props.product.User_id){ 
        useridfield=<EditableCells onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "User_id",
          value: this.props.product.User_id,
          id: this.props.product.User_id
        }}/>;
        }else{
        	useridfield=<td><input type="text" name="userid" value="" disabled /></td>;
        }
    return (
	   
      <tr className="eachRow">
     	{useridfield}


        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Name",
          value: this.props.product.Name,
          id: this.props.product.User_id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Email",
          value: this.props.product.Email,
          id: this.props.product.User_id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Mobile",
          value: this.props.product.Mobile,
          id: this.props.product.User_id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Password",
          value: this.props.product.Password,
          id: this.props.product.User_id
        }}/>
        <DropdownCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Type",
          value: this.props.product.Type,
          id: this.props.product.User_id
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
        <input type='text' size="5" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} Value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}


class EditableCells extends React.Component {

  render() {
    return (
      <td>
        <input type='text' size="5" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} Value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} disabled/>
      </td>
    );

  }

}
class DropdownCell extends React.Component {

  render() {
    return (
    	<td>
      <select class="typeDropdown" name={this.props.cellData.type} id={this.props.cellData.id} defaultValue={this.props.cellData.value+""} onChange={this.props.onProductTableUpdate}>
            <option value = "0">Admin</option>
            <option value = "1">Member</option>
            
         </select>
         </td>
    );

  }

}
const mapActionsToProps={
  onFetchApi:fetchApi,
  onUpdateUser:updateUser
}
const mapStateToProps=state=>({
  products:state.users
})
export default connect(mapStateToProps,mapActionsToProps)(withRouter(User));
