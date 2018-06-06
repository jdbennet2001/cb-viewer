import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';

import Canvas from './browser/Canvas';

import {Search} from 'carbon-components-react';

import home_icon from '../icons/home.svg'
import parent_icon from '../icons/parent-folder.svg'

import {
  openFolderAction,
  openParentFolderAction,
  openRootFolderAction,
  openArchiveAction
} from '../actions/initAction'

class Browser extends Component {

  render() {

  	let folders = this.props.browsing.current_folders || [];
    let archives = this.props.browsing.current_archives || [];


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
                openArchiveAction = {this.props.openArchiveAction}
        />

      </div>        
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 openFolder: (data) => dispatch(openFolderAction(data)),
 openParentFolderAction: (data) => dispatch(openParentFolderAction(data)),
 openRootFolderAction: (data) => dispatch(openRootFolderAction(data)),
 openArchiveAction: (data) => dispatch(openArchiveAction(data))

})

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
