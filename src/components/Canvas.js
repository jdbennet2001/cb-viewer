import React, { Component } from 'react';
import './Canvas.css';

import comic from '../icons/comic.svg'

import Folder from './Folder'
import Archive from './Archive'


class Canvas extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
  }

  openArchive = (archive) =>{
    alert(`Open Archive: ${archive}`);
  }

  openFolder = (folder) =>{
    this.props.openFolderAction(folder);
    alert(`Open Folder: ${folder}`);
  }

  render() {

    let folders = this.props.folders.map(folder =>{
      return <Folder location={folder} onClick={this.openFolder}></Folder>
    });

    let archives = this.props.archives.map(archive =>{
      return <Archive archive={archive} onClick={this.openArchive}></Archive>
    });


    return (
        <div className='catalog-area'>
          {folders}
          {archives}
        </div>
        
    );
  }
}

export default Canvas
