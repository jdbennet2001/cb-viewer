import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


import { initAction } from './actions/initAction'
import { Search } from 'carbon-components-react';

import home_icon from './icons/home.svg'
import parent_icon from './icons/parent-folder.svg'


class App extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
  }

  componentDidMount(){
    debugger;
    let action = this.props.simpleAction;
    fetch("http://localhost:2002/model")
    .then(response => {
      return response.json()
    }).then(jsondata => {
      return action(jsondata);
    })
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">

          <img className='top-action' src={home_icon} alt="Home" height="32" width="32"></img>
          <img className='top-action' src={parent_icon} alt="Parent Folder" height="32" width="32"></img>
          <Search  className="top-search" labelText="Search" placeHolderText="Search" />

        </header>

        <div className='catalog-area'>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: (data)  => dispatch(initAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
