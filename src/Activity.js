import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Navadmin from './Navadmin.js';
import {withRouter} from 'react-router-dom';
import UserProfile from './LoginEnclosure.js';
import {connect} from 'react-redux';
import {fetchActivityApi,activityAction} from './actions/activity-action';
class Activity extends Component {
   constuctor() {
          this.routeChange = this.routeChange.bind(this);
       }
  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    
  }
  componentWillMount=(e)=>{
    console.log(UserProfile.getName());
    if(!UserProfile.getName() || UserProfile.getName()==""){
        let path = `accessdenied`;
      this.props.history.push(path);
    }
     this.props.onfetchActivityApi(); 
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    console.log(product);
    console.log('/deleteactivity/'+product.Activity_id);
    axios.delete(`/deleteactivity/${product.Activity_id}`)
      .then((res)=>{
        console.log('delete data');
        console.log(res);
      });
    var products=this.props.products.activity;
    var index = products.indexOf(product);
    products.splice(index, 1);
    this.props.onActivityUpdate(products);
  };

  handleAddEvent(evt) {
    while(true){
    var bool=true;
    var id = (Math.floor(Math.random() * 999999));

    this.props.products.activity.map((item)=>{
      if(id> 1000 && id != item.Activity_id){
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
      Activity_id: id,
      Description: "",
      Minimum: "",
    }
    let products=this.props.products.activity;
    products.unshift(product);
    this.props.onActivityUpdate(products);
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
      
var products = this.props.products.activity.slice();
  // console.log(products);

  var newProducts = products.map(function(product) {

    for (var key in product) {
      // console.log("hello   "+key);
      if (key == item.name && parseInt(product.Activity_id) == parseInt(item.id)) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.props.onActivityUpdate(newProducts);
    // this.setState({products:newProducts});
  //  console.log(this.state.products);
  };

  updatedatabase(e){
    // console.log(this.state.products);
    this.props.products.activity.map((item)=>{
      if(parseInt(item.Activity_id)<1000){
        
        axios.post('/updateactivity', {
          Activity_id: item.Activity_id,
          Description: item.Description,
          Minimum: item.Minimum,
          
        }).then((res,err)=>{
          console.log(err);
        });
        
      }
      else{
        axios.post('/addactivity', {
          
          Description: item.Description,
          Minimum: item.Minimum,
          
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
        <h2 class="title-style-1">Activity List <span class="title-under"></span></h2>
        <ProductTable  onUpdateDatabase={this.updatedatabase.bind(this)} onUserInput={this.handleUserInput.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.props.products.activity} filterText={this.state.filterText}/>
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
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    if(this.props.products){
        var product = this.props.products.map(function(product) {
      if (product.Description.indexOf(filterText) === -1) {
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
            <input type="text" maxlength="4" size="4" placeholder="Search Activity..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
          </div>
          <div class="col-md-4 col-sm-0"></div>
          <div class="col-md-4 col-sm-12">
            <button type="button" onClick={this.props.onRowAdd} className="adduser btn btn-success ">Add Activity</button>
            <button type="button" onClick={this.saveuser} className="btn btn-success ">Save</button>
          </div>
        </div>
      </div>
    <div>     
        <div class="formclass">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Description</th>
              <th>Minimum Contribution</th>
              
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
    if (this.props.product.Activity_id){ 
        useridfield=<EditableCells onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "Activity_id",
          value: this.props.product.Activity_id,
          id: this.props.product.Activity_id
        }}/>;
        }else{
          useridfield=<td><input type="text" name="userid" value="" disabled /></td>;
        }
    return (
     
      <tr className="eachRow">
      {useridfield}


        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Description",
          value: this.props.product.Description,
          id: this.props.product.Activity_id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Minimum",
          value: this.props.product.Minimum,
          id: this.props.product.Activity_id
        }}/>
        
        <td className="del-cell">
          <input type="button" onClick={this.deletebutton} value="Delete" className="del-btn btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

class EditableCells extends React.Component {

  render() {
    return (
      <td>
        <input disabled type='text' size="10" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} Value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' size="10" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} Value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}
const mapStateToProps=state=>({
    products:state.activity
});
const mapActionsToProps={
    onfetchActivityApi:fetchActivityApi,
    onActivityUpdate:activityAction
}
export default connect(mapStateToProps,mapActionsToProps)(withRouter(Activity));
