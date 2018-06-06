import React, { Component } from 'react';
import path from 'path'

import './Folder.css';

import comic from '../icons/comic.svg'


class Folder extends Component {

   handleClick = () => {
    this.props.onClick(this.props.location);
  }


  render() {

    let folder_name = path.basename(this.props.location);

    return (
        <div className='catalog-folder'>
           <img src={comic} alt="Folder" onClick={this.handleClick} height="64" width="64"></img>
           <div>{folder_name}</div>
        </div>
        
    );
  }
}

export default Folder
