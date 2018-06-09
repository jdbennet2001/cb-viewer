import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';

import {Breadcrumb, BreadcrumbItem} from 'carbon-components-react';

import Slider from 'react-rangeslider'

import {exitReaderAction} from '../actions/initAction'

import home_icon from '../icons/home.svg'

import append_query from 'append-query';


class Reader extends Component {

	constructor(props, context) {
		super(props, context)

		let archive = this.props.model.archives.find(archive =>{
  		return archive.open;
  	})

		this.state = Object.assign({}, archive, {	value: 0} );
		// this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

	}

	chompLeft(s = '', prefix = '') {
		if (s.indexOf(prefix) === 0) {
			return s.slice(prefix.length);

		}
		return s;
	}


	/* Allow arrow keys to navigate to the next page */
	handleKeyPress = (e) => {

		const RIGHT_ARROW = 39;
		const LEFT_ARROW = 37;

		let value = this.state.value;
		let length = this.state.length;

		if (e.keyCode == RIGHT_ARROW) {
			let state = Object.assign({}, this.state, {value: Math.min(length, ++value)});
			this.setState(state);
		} else if (e.keyCode === LEFT_ARROW) {
			let state = Object.assign({}, this.state, {value: Math.max(--value , 0)});
			this.setState(state);
		}
	}

	handleClick = (e) => {
		let state = this.state;
		this.setState(state);
	}

	/* Update the page in response to the scroll bar */
	onChange = (value) => {

		let state = Object.assign({}, this.state, {value});
		this.setState(state);

		console.log('Slide! ' + value);
	}

  render() {

  	debugger;



  	let {value} = this.state;

  	let {directory, name, length, location, page} = this.state;
  	let {source_dir} = this.props.model;

  	let folders = this.chompLeft(location,source_dir);
  		folders = this.chompLeft(folders, '/');
  		folders = folders.split('/');

  	const breadcrumbs = folders.map(folder =>{
  		return <BreadcrumbItem href='#' key={folder}>{folder}</BreadcrumbItem>;
  	})

  	let image = append_query( 'http://localhost:2002/page', {archive: location, number: value} );

    return (
      <div className='reader' onKeyDown={(event) => this.handleKeyPress(event)} tabIndex="0" >

         <header className="reader-header">
             <Breadcrumb className="bread-crumb">
	         	{breadcrumbs}
			</Breadcrumb>
          <img className='home-action' src={home_icon} onClick={this.props.exitReader} alt="Home" height="32" width="32"></img>
        </header>

        <img  ref={input => input && input.focus()} className='page' key={image} src={image} tabIndex="0" onClick={this.handleClick}></img>

        <div className='reader-footer'>
        	<Slider  className='slider' value={value} max={length} onChange={this.onChange}  ></Slider>
        </div>

      </div>

    );
  }
}




const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 exitReader: (data) => dispatch(exitReaderAction(data))

})

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
