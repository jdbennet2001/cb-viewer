import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';

import Canvas from './browser/Canvas';

import {Search} from 'carbon-components-react';

import home_icon from '../icons/home.svg'
import parent_icon from '../icons/parent-folder.svg'
import random_icon from '../icons/random.svg'
import history_icon from '../icons/history.svg'

import {
  openFolderAction,
  openParentFolderAction,
  openRootFolderAction,
  openArchiveAction,
  randomArchiveAction,
  historyArchiveAction
} from '../actions/initAction'

class Browser extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {};
  }

  doFilter = (e) => {
    let filter = e.currentTarget.value;
    this.setState({filter});
    e.preventDefault;
    console.log(e);
  }



  render() {

    let folders = this.props.model.folders.filter(folder =>{
      return folder.visible;
    })

    let archives = this.props.model.archives.filter(archive =>{
      return archive.visible;
    })

    //Bind the filter handler to ensure 'this' is correct
    this.doFilter = this.doFilter.bind(this);

    let home_dir = (this.props.model.current_dir == this.props.model.source_dir);


    return (
		<div className="App">

        <header className="App-header">

          <img className='top-action' src={home_icon} onClick={this.props.openRootFolderAction} alt="Home" height="32" width="32"></img>
          <img className='top-action' src={parent_icon} onClick={this.props.openParentFolderAction} alt="Parent Folder" height="32" width="32"></img>
          { home_dir &&
            <img className='top-action' src={random_icon} onClick={this.props.displayRandomAction} alt="Random" height="32" width="32"></img>
          }
          { home_dir &&
            <img className='top-action' src={history_icon} onClick={this.props.displayHistoryAction} alt="History" height="32" width="32"></img>
          }

          <Search  className="top-search" labelText="Search" onChange={this.doFilter} placeHolderText="Search" />

        </header>

        <Canvas folders = {folders}
                archives = {archives}
                filter={this.state.filter}
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
 openArchiveAction: (data) => dispatch(openArchiveAction(data)),
 displayRandomAction: (data) => dispatch(randomArchiveAction(data)),
 displayHistoryAction: (data) =>dispatch(historyArchiveAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
