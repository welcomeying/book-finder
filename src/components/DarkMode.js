import React, { Component } from 'react';

class DarkMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: null
    };
  }

  toggleMode = () => {
  	this.setState ({
      darkMode: !this.state.darkMode
    })
    if (!this.state.darkMode) {
      this.darkMode();
    }
    else {
    	this.lightMode();
    }
  }

  lightMode = () => {
  	
  	if (this.state.darkMode) {
      this.setState({
        darkMode: false
      })
      document.body.classList.remove('dark-mode');
    }
  }

  darkMode = () => {
  	if (!this.state.darkMode) {
      this.setState ({
        darkMode: true
      })
      document.body.classList.add('dark-mode');
    }
    
  }

  render() {
    return (
      <div className="dark-mode-toggle">
        <button type="button" onClick={this.lightMode}>☀</button>
        <button type="button" onClick={this.toggleMode}>0</button>
        <button type="button" onClick={this.darkMode}>☾</button>
      </div>
    )
  }
}


export default DarkMode;