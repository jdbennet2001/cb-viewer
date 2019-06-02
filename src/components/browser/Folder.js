import React, { Component } from 'react';
import path from 'path'

import './Folder.css';

import comic from '../../icons/comic.svg'


class Folder extends Component {

   handleClick = () => {
    this.props.onClick(this.props.location.directory);
  }


  render() {

      debugger;
    let {name:folder_name} = (this.props.location);

    return (
        <div className='catalog-folder'>
           <img src={comic} alt="Folder" onClick={this.handleClick} ></img>
           <div>{folder_name}</div>
        </div>
        
    );
  }
}

export default Folder
