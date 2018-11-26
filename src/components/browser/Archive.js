import React, { Component } from 'react';
import path from 'path'
import _    from 'lodash'

import './Archive.css';

import comic_book from '../../icons/comic-book.svg'


class Archive extends Component {

  handleClick = () => {
    this.props.onClick(this.props.archive);
  }


  render() {

    let {length, name} =  this.props.archive;
    let issue = number(name);
    let summary = description(name);
        summary = _.isEmpty(issue) ? name: summary;
    let status = this.props.archive.read ? 'archive-info read-issue' : 'archive-info new-issue';
    let cover = `http://${window.location.hostname}:2002/cover/${encodeURIComponent(name)}`
    return (
        <div className='catalog-archive'>
           <img src={cover} alt="Archive" onClick={this.handleClick} ></img>
           <div className={status}>{summary}</div>
           <div><span className='number'>{issue}</span><span className='pages'>{length} pages</span></div>
        </div>
        
    );
  }
}

function number(name){
  let  tokens = _.split(name, ' ');
  let  token = _.filter(tokens, token =>{
    return _.startsWith(token, '#')
  });
  return token;
}

function description(name){
  
  let bracket = name.lastIndexOf(')');
  if ( bracket === -1 && _.includes(name, '#')){
    return name;
  }

  let description = name.substring(bracket+1).trim();
  description=_.trimEnd(description, '.cbz')
  description=_.trimEnd(description ,'.cbr')
  description=_.trimStart(description,'-');
  
  
  return _.trim(description);
}

export default Archive
