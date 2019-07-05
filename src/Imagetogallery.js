import React from 'react';
import ReactDOM from 'react-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import Navadmin from './Navadmin.js';
import verifytoken from './extra/Verifytoken';
// import './Testpage6.css';

      class Imagetogallery extends React.Component {
        constructor(props){
          super(props);
          this.state={
            selectedFile: null, 
            loaded: 0,
            numberdates:"",
            counter:0,
            authenticateduser:[]

          };
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
          }


        handleselectedFile = (event) => {
          var dates=new Date();
          var numberdates=dates.getTime()+"";
          var filedata=event.target.files[0];
          // filedata['name']=numberdates+filedata['name'];
          numberdates=numberdates+filedata.name;
          var new_file = new File([filedata], (numberdates));
          console.log(filedata);
          console.log("type");
          console.log(new_file);
            this.setState({
              selectedFile: filedata,

              loaded: 0,
              numberdates:numberdates,
              counter:1
            });
            console.log("select success");
            console.log(numberdates);
          }
          handleUpload = () => {
              let token=localStorage.getItem('token');
              if(this.state.counter== 1){            
                  const data = new FormData()
                  console.log(data);
                  data.append('numberdates',this.state.numberdates)
                  data.append('type',1)
                  data.append('file', this.state.selectedFile, this.state.selectedFile.name)
                  
                  // console.log(JSON.stringify(data));
                  console.log("upload start");
                  axios.post('/api/upload', data, {
                      onUploadProgress: ProgressEvent => {
                        this.setState({
                          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                        })
                      },headers:{Authorization:`Bearer ${token}`}
                    })
                    .then(res => {
                      console.log(res.statusText)
                    })
                console.log("upload ended");
                
          }

        }


          render(){
            return(
              <div>
                  <Navadmin authenticateduser={this.state.authenticateduser}/>
                  <div class="belownav"></div>
                   <h2 class="title-style-1">Upload Image <span class="title-under"></span></h2>
                  <div class="container imagetogallery">
                  <div class="row">
                  <div class="col-md-2 col-0"></div>
                  <div class="col-md-6 col-12 upload-superdiv">
                  <div class="upload-div">
                        <input type="file" name="" id="" onChange={this.handleselectedFile} />
                        <button class="btn btn-success" onClick={this.handleUpload}>Upload</button>
                        <div> {Math.round(this.state.loaded,2) } %</div>
                      </div>

                  </div>
                  </div>
                  <div class="col-md-2 col-0"></div>
                  </div>

                  </div>


              );
          }


      }

      export default Imagetogallery;