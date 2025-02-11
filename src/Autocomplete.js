import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    // console.log("props");
    // console.log(props.cellData);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: this.props.cellData.value
    };
  }
  // componentWillMount=(e)=>{
  //   console.log("component");
  //   console.log(this.props.cellData);
  //   this.setState({
  //     userInput:this.props.cellData.value
  //   });

  // }

  // Event fired when the input value is changed
  onChange = e => {
    // console.log(this.props.cellData.value);
    this.props.cellData.value=e.currentTarget.value;
    // console.log(this.props.cellData.value);



    var evt = {
      id: this.props.cellData.id,
      name: this.props.cellData.type,
      value: e.currentTarget.value
    };
    this.props.onProductTableUpdates(evt);
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
  
    // console.log(this.props.cellData.value);
    this.props.cellData.value=e.currentTarget.innerText;
    var evt = {
      id: this.props.cellData.id,
      name: this.props.cellData.type,
      value: e.currentTarget.innerText
    };
    // console.log(evt);
    this.props.onProductTableUpdates(evt);

    // console.log(this.props.cellData.value);
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
      
    });
    
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    var defaultvalue=this.props.cellData.value;
    // console.log('render');
    // console.log(defaultvalue);
    // if(this.state.userInput == ""){
    //   this.setState({
    //   userInput:defaultvalue
    // })
    // }
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
      <td>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={this.props.cellData.value}
          name={this.props.cellData.type} 
          id={this.props.cellData.id} 
          class={this.props.cellData.type}
          
        />
        {suggestionsListComponent}
        </td>
      </Fragment>
    );
  }
}

export default Autocomplete;
