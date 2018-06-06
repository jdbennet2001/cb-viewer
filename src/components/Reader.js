import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';

import {Breadcrumb, BreadcrumbItem} from 'carbon-components-react';

import Slider from 'react-rangeslider'

import {nextPageAction, previousPageAction, openRootFolderAction} from '../actions/initAction'

import home_icon from '../icons/home.svg'

import append_query from 'append-query';


class Reader extends Component {

	constructor(props, context) {
		super(props, context)

		this.state = {
			value: 0,
			width: 0,
			height: 0
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

	}

	chompLeft(s = '', prefix = '') {
		if (s.indexOf(prefix) === 0) {
			return s.slice(prefix.length);

		}
		return s;
	}

	/* Keep track of how big the screen is */
	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	 	let state = Object.assign({}, this.state, { width: window.innerWidth, height: window.innerHeight });
	  	this.setState(state);
	}

	/* Scroll to top after page render */
	componentWillUpdate(){
	  // window.scrollTo({top: 0, left: 0, behavior: 'instant'})
	}

	/* Allow arrow keys to navigate to the next page */
	handleKeyPress = (e) => {

		const RIGHT_ARROW = 39;
		const LEFT_ARROW = 37;

		let value = this.state.value;
		let length = this.props.reading.length;

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

  	let {value} = this.state;

  	let {directory, name, length, location, page} = this.props.reading;
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
          <img className='home-action' src={home_icon} onClick={this.props.openRoot} alt="Home" height="32" width="32"></img>
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
 openRoot: (data) => dispatch(openRootFolderAction(data)) 

})

export default connect(mapStateToProps, mapDispatchToProps)(Reader);