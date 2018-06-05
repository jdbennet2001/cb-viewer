import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


import { simpleAction } from './actions/simpleAction'
import { Search } from 'carbon-components-react';

import home_icon from './icons/home.svg'
import parent_icon from './icons/parent-folder.svg'


class App extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
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
 simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
