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

		this.state = Object.assign({}, archive, {value: 0, controls_visible: false} );
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

		if (e.keyCode == RIGHT_ARROW) {
			this.next_page()
		} else if (e.keyCode === LEFT_ARROW) {
			this.prev_page();
		}
	}

	next_page = () =>{
		let value  = this.state.value;
		let length = this.state.length;
			value  = Math.min(--length, ++value);
		let state = Object.assign({}, this.state, {value, controls_visible:false});
		this.setState(state);
	}

	prev_page = () => {
		let value  = this.state.value;
			value  = Math.max(0, --value);
		let state = Object.assign({}, this.state, {value, controls_visible:false});
		this.setState(state);
	}

	toggle_controls = () =>{
		let controls_visible = !this.state.controls_visible;
		let state = Object.assign({}, this.state, {controls_visible});
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

  	let {directory, name, length, location, page} = this.state;
  	let {source_dir} = this.props.model;

  	let folders = this.chompLeft(location,source_dir);
  		folders = this.chompLeft(folders, '/');
  		folders = folders.split('/');

  	let controls_visible = this.state.controls_visible ? 'show-controls' : 'hide-controls';
  	let header_css = `reader-header ${controls_visible}`;
  	let footer_css = `reader-footer ${controls_visible}`

  	const breadcrumbs = folders.map(folder =>{
  		return <BreadcrumbItem href='#' key={folder}>{folder}</BreadcrumbItem>;
  	})

  	let image = append_query( 'http://jons-macbook-pro.local:2002/page', {archive: location, number: value} );
  	let cache_next1 = append_query( 'http://jons-macbook-pro.local:2002/page', {archive: location, number: value+1} );
  	let cache_next2 = append_query( 'http://jons-macbook-pro.local:2002/page', {archive: location, number: value+2} );

    return (
      <div className='reader' onKeyDown={(event) => this.handleKeyPress(event)} tabIndex="0" >

         <header className={header_css}>
             <Breadcrumb className="bread-crumb">
	         	{breadcrumbs}
			</Breadcrumb>
          <img className='home-action' src={home_icon} onClick={this.props.exitReader} alt="Home" height="32" width="32"></img>
        </header>

		<div className='leftTargetArea' onClick={this.prev_page}></div>
		<div className='centerTargetArea' onClick={this.toggle_controls}></div>
		<div className='rightTargetArea' onClick={this.next_page}></div>
				
        <img  ref={input => input && input.focus()} className='page'  key={image} src={image} tabIndex="0"></img>
        <img  ref={input => input && input.focus()} className='page cache' key={cache_next1} src={cache_next1} tabIndex="1" ></img>
        <img  ref={input => input && input.focus()} className='page cache' key={cache_next2} src={cache_next2} tabIndex="1" ></img>

        <div className={footer_css}>
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
