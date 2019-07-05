import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState,RichUtils,convertToRaw} from 'draft-js';
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import Navadmin from './Navadmin.js';
import {withRouter} from 'react-router-dom';
import UserProfile from './LoginEnclosure.js';
import verifytoken from './extra/Verifytoken';
import './Addpost.css';

      class Addpost extends React.Component {
         constuctor() {
          this.routeChange = this.routeChange.bind(this);
       }
        constructor(props) {
          super(props);
          this.state = {
            editorState: EditorState.createEmpty(),
            To:3,
            Types:1,
            selectedFile: null, 
            loaded: 0,
            numberdates:"",
            counter:0,
            editorContentHtml:"",
            authenticateduser:[]
           };

          this.focus = () => this.refs.editor.focus();
          this.onChange = (editorState) => {
              // const contentState = editorState.getCurrentContent();
              // console.log('content state', convertToRaw(contentState));

              this.setState({
                  editorState,
                 editorContentHtml: stateToHTML(editorState.getCurrentContent())
                  

              });
             

              



          }

          this.handleKeyCommand = (command) => this._handleKeyCommand(command);
          this.onTab = (e) => this._onTab(e);
          this.toggleBlockType = (type) => this._toggleBlockType(type);
          this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        }

        componentWillMount=(e)=>{
    // console.log(UserProfile.getName());
    // if(!UserProfile.getName() || UserProfile.getName()==""){
    //     let path = `accessdenied`;
    //   this.props.history.push(path);
    // }
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
        
        _handleKeyCommand(command) {
          const {editorState} = this.state;
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }

        _onTab(e) {
          const maxDepth = 4;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        }

        _toggleBlockType(blockType) {
          this.onChange(
            RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
            )
          );
        }

        _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }
        updatedatabase=()=>{
          let token=localStorage.getItem('token');
          let config={headers:{Authorization:`Bearer ${token}`}};
          axios.get(`/api/image/${this.state.numberdates}`,config)
            .then((res)=>{
              // console.log(res.data[0].Image);
              // console.log(this.state.editorContentHtml);
              // console.log(this.state.Types);
               console.log(this.state.authenticateduser);
              if(res.data[0].Image){

                  axios.post('/api/addpost',{
                      Text:this.state.editorContentHtml,
                      Image:this.state.numberdates,
                      Type:this.state.Types,
                      User_id:this.state.authenticateduser[0].User_id,
                      Too:this.state.To



                    },config).then((res)=>{
                        console.log(res);
                    });
              }


            });
          
        }
        savepost=(e)=>{
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
          });
          
        }
        onProductTableUpdate=(evt)=>{

          var item = {
          
          name: evt.target.name,
          value: evt.target.value
         };
         this.setState({
            To:parseInt(item.value)
         })

        }

        onProductTableUpdates=(evt)=>{

          var item = {
          
          name: evt.target.name,
          value: evt.target.value
         };
         this.setState({
            Types:parseInt(item.value)
         })

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
              let config={headers:{Authorization:`Bearer ${token}`}};
              if(this.state.counter== 1){            
                  const data = new FormData()
                  console.log(data);
                  data.append('numberdates',this.state.numberdates);
                  data.append('type',0);
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

        render() {
          const {editorState} = this.state;

          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }

          return (
            <div>
            <Navadmin authenticateduser={this.state.authenticateduser} />
            <div class="belownav"></div>
            <h2 class="title-style-1">Add Post ... <span class="title-under"></span></h2>
            <div class="container">
              <div class="row">
                  <div class="col-md-2 col-sm-0"></div>
                  <div class="col-md-7 col-sm-12">
                  <div className="RichEditor-root">
                    <BlockStyleControls
                      editorState={editorState}
                      onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                      editorState={editorState}
                      onToggle={this.toggleInlineStyle}
                    />
                    <div className={className} onClick={this.focus}>
                      <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder=""
                        ref="editor"
                        spellCheck={true}
                      />
                    </div>
                  </div>
                      <div class="postbutton">
                    <button type="button" onClick={this.savepost} className="btn btn-success">Post</button>
                  </div>
                  </div>
                  <div class="col-md-3 col-sm-12">

                        <form>
                          <label>To :</label><br></br>
                          <DropdownCell onProductTableUpdate={this.onProductTableUpdate} cellData={{
                            type: "To",
                            value: this.state.To,
                        
                          }}/>
                          <br></br><br></br>
                          <label>Post Type :</label><br></br>
                          <DropdownCells onProductTableUpdate={this.onProductTableUpdates} cellData={{
                            type: "Types",
                            value: this.state.Types,
                        
                          }}/><br></br>
                          
                      
                    </form>


                      <div class="upload-div">
                        <input type="file" name="" id="" onChange={this.handleselectedFile} />
                        <button class="btn btn-success" onClick={this.handleUpload}>Upload</button>
                        <div> {Math.round(this.state.loaded,2) } %</div>
                      </div>


                  </div>
            </div>
            </div>
           

             
             



            </div>
          );
        }
      }

      // Custom overrides for "code" style.
      const styleMap = {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      };

      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }

      class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }

        render() {
          let className = 'RichEditor-styleButton';
          if (this.props.active) {
            className += ' RichEditor-activeButton';
          }

          return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
          );
        }
      }

      const BLOCK_TYPES = [
        {label: 'H1', style: 'header-one'},
        {label: 'H2', style: 'header-two'},
        {label: 'H3', style: 'header-three'},
        {label: 'H4', style: 'header-four'},
        {label: 'H5', style: 'header-five'},
        {label: 'H6', style: 'header-six'},
        {label: 'Blockquote', style: 'blockquote'},
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
        {label: 'Code Block', style: 'code-block'},
      ];

      const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return (
          <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };

      var INLINE_STYLES = [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'},
        {label: 'Monospace', style: 'CODE'},
      ];

      const InlineStyleControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };


      class DropdownCell extends React.Component {

        render() {
          return (
            
            <select class="typeDropdowns" name={this.props.cellData.type} defaultValue={this.props.cellData.value+""} onChange={this.props.onProductTableUpdate}>
                  <option value = "0">Admin</option>
                  <option value = "1">Members</option>
                  <option value = "2">Board Members</option>
                  <option value = "3">All Members</option>
                  
               </select>
               
          );

        }

      }
       class DropdownCells extends React.Component {

        render() {
          return (
            
            <select class="typeDropdowns" name={this.props.cellData.type} defaultValue={this.props.cellData.value+""} onChange={this.props.onProductTableUpdate}>
                  <option value = "0">General</option>
                  <option value = "1">Notice</option>
                  <option value = "2">Event</option>
                 
                  
               </select>
               
          );

        }

      }

     export default withRouter(Addpost);