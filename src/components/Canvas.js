import React, { Component } from 'react';
import './Canvas.css';

import comic from '../icons/comic.svg'

import Folder from './Folder'


class Canvas extends Component {

  simpleAction = (event) => {
   this.props.simpleAction();
  }


  render() {

    let folders = this.props.folders.map(folder =>{
      return <Folder location={folder}></Folder>
    });

    return (
        <div className='catalog-area'>
          {folders}
        </div>
        
    );
  }
}

export default Canvas
