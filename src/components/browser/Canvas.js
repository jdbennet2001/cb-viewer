import React, { Component } from 'react';
import './Canvas.css';

import comic from '../../icons/comic.svg'

import Folder from './Folder'
import Archive from './Archive'


class Canvas extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
  }

  openArchive = (archive) =>{
    this.props.openArchiveAction(archive);
  }

  openFolder = (folder_directory) =>{
    this.props.openFolderAction(folder_directory);
  }

  render() {

    let folders = this.props.folders.map(folder =>{
      return <Folder location={folder.directory} onClick={this.openFolder} key={folder.directory}></Folder>
    });

    let archives = this.props.archives.map(archive =>{
      return <Archive archive={archive} onClick={this.openArchive} key={archive.name}></Archive>
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
