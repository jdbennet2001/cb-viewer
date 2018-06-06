import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


import Canvas from './components/Canvas'

import { initAction, openFolderAction, openParentFolderAction, openRootFolderAction } from './actions/initAction'
import { Search } from 'carbon-components-react';

import home_icon from './icons/home.svg'
import parent_icon from './icons/parent-folder.svg'


class App extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
  }

  componentDidMount(){
    let action = this.props.simpleAction;
    fetch("http://localhost:2002/model")
    .then(response => {
      return response.json()
    }).then(jsondata => {
      return action(jsondata);
    })
  }

  render() {

    let folders = this.props.modelReducer.current_folders || [];
    let archives = this.props.modelReducer.current_archives || [];

    return (
      <div className="App">
        
        <header className="App-header">

          <img className='top-action' src={home_icon} onClick={this.props.openRootFolderAction} alt="Home" height="32" width="32"></img>
          <img className='top-action' src={parent_icon} onClick={this.props.openParentFolderAction} alt="Parent Folder" height="32" width="32"></img>
          <Search  className="top-search" labelText="Search" placeHolderText="Search" />

        </header>

        <Canvas folders = {folders}
                archives = {archives}
                openFolderAction = {this.props.openFolder}
                openParentFolderAction = {this.props.openParentFolderAction}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: (data)  => dispatch(initAction(data)),
 openFolder: (data) => dispatch(openFolderAction(data)),
 openParentFolderAction: (data) => dispatch(openParentFolderAction(data)),
 openRootFolderAction: (data) => dispatch(openRootFolderAction(data))

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
