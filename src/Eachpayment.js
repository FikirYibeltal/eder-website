import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Navadmin from './Navadmin.js';
import {withRouter} from 'react-router-dom';
import UserProfile from './LoginEnclosure.js';
import verifytoken from './extra/Verifytoken';
import {connect} from 'react-redux';
import {fetchPaymentApi} from './actions/payment-action';
class Activity extends Component {
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
    this.state.authenticateduser=[

    ];
    this.state.payments=[];

  }
  componentWillMount=(e)=>{
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
    
    //this.props.onfetchPaymentApi();
     axios.get("/getactivity")
      .then((res)=>{
        console.log(res);

        this.setState({
          products:res.data
        });
        
      });

      axios.get("/getpayment")
      .then((res)=>{
        var payment=this.state.payments;
        var id=UserProfile.getId();
        res.data.map((item)=>{
          if(UserProfile.getId()==item.User_id){
            var index={Activity_id:item.Activity_id,User_id:item.User_id};
            payment.push(index);
          }
           
        });
        this.setState({
          payments:payment
        });
        // console.log(this.state.products);
        // console.log(this.state.payments);

          var productsextended=this.state.products.map((item)=>{
          for(var x=0;x<this.state.payments.length;x++){
            if(item.Activity_id==this.state.payments[x].Activity_id){
                item["Paid"]=1;
                break;
            }
            else{
              item["Paid"]=0
            }
          }
          return item;
        });
          //console.log(productsextended);
        this.setState({
          products:productsextended
        })
      });

      
  }

     componentDidMount=(e)=>{
   


   }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
   
    
  };

  handleAddEvent(evt) {
   

  }

  handleProductTable(evt) {
    
  };

  updatedatabase(e){
   


  }

  render() {

    return (
      <div>
        <Navadmin />
        <div class="belownav"></div>
        <h2 class="title-style-1"> Your Payment <span class="title-under"></span></h2>
        <ProductTable  onUpdateDatabase={this.updatedatabase.bind(this)} onUserInput={this.handleUserInput.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
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
   
  };


  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.Description.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });

    return (
      <div>
      <div class="userbutton container-fluid">
        <div class="row">
          <div class="col-md-4 cols-sm-12">
            <input type="text" maxlength="4" size="4" placeholder="Search Activity..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
          </div>
          <div class="col-md-4 col-sm-0"></div>
          <div class="col-md-4 col-sm-12">
            
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
              <th>Status</th>
              
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
      var statusfield;
      if(this.props.product.Paid==0){
        statusfield=<td className="del-cell">
          <input type="button" onClick={this.deletebutton} value="Not Paid" className="del-btn btn btn-danger"/>
        </td>
      }
      else{
        statusfield=<td className="del-cell">
          <input type="button" onClick={this.deletebutton} value="Paid" className="del-btn btn btn-success"/>
        </td>
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
        {statusfield}
        
       
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
        <input disabled type='text' size="10" class={this.props.cellData.type} name={this.props.cellData.type} id={this.props.cellData.id} Value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}
const mapStateToProps=state=>({
  products:state.payment
})
const mapActionsToProps={
  onfetchPaymentApi:fetchPaymentApi
}

export default connect(mapStateToProps,mapActionsToProps)(withRouter(Activity));
