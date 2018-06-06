import React, { Component } from 'react';
import path from 'path'

import './Archive.css';

import comic_book from '../../icons/comic-book.svg'


class Archive extends Component {

  handleClick = () => {
    this.props.onClick(this.props.archive);
  }


  render() {

    let archive_name = this.props.archive.name;

    return (
        <div className='catalog-archive'>
           <img src={comic_book} alt="Archive" onClick={this.handleClick} height="64" width="64"></img>
           <div>{archive_name}</div>
        </div>
        
    );
  }
}

export default Archive
