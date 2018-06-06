import React, { Component } from 'react';
import path from 'path'

import './Folder.css';

import comic from '../icons/comic.svg'


class Folder extends Component {


  render() {

    let folder_name = path.basename(this.props.location);

    return (
        <div className='catalog-folder'>
           <img src={comic} alt="Folder" height="64" width="64"></img>
           <div>{folder_name}</div>
        </div>
        
    );
  }
}

export default Folder
