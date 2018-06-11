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
    let status = this.props.archive.read ? 'archive-info read-issue' : 'archive-info new-issue';
    let cover = `http://${window.location.hostname}:2002/cover/${encodeURIComponent(archive_name)}`
    return (
        <div className='catalog-archive'>
           <img src={cover} alt="Archive" onClick={this.handleClick} ></img>
           <div className={status}>{archive_name}</div>
        </div>
        
    );
  }
}

export default Archive
