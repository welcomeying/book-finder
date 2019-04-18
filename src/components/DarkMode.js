import React, { Component } from 'react';

const localMode = 'bookFinder_darkMode';

class DarkMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: this.props.darkMode
    };
  }

  toggleMode = () => {
    localStorage.setItem(localMode, !this.state.darkMode);
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
      localStorage.setItem(localMode, false);
      document.body.classList.remove('dark-mode');
    }
  }

  darkMode = () => {
    if (!this.state.darkMode) {
      this.setState ({
        darkMode: true
      })
      localStorage.setItem(localMode, true);
      document.body.classList.add('dark-mode');
    }
    
  }

  componentDidMount() {
    if (this.state.darkMode){
      document.body.classList.add('dark-mode');
    }
    else {
      document.body.classList.remove('dark-mode');
    }
  }

  render() {
    return (
      <div className='dark-mode-toggle'>
        <button type='button' className='sun' onClick={this.lightMode}>☀</button>
        <span className='toggle-control'>
          <input type='checkbox' className="dmcheck" checked={this.state.darkMode} onChange={this.toggleMode} />
          <label htmlFor="dmcheck" />
        </span>  
        <button type='button' className='moon' onClick={this.darkMode}>☾</button>
      </div>
    )
  }
}


export default DarkMode;