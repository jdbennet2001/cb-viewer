import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reader.css';

import {Breadcrumb, BreadcrumbItem} from 'carbon-components-react';

import Slider from 'react-rangeslider'

import {nextPageAction, previousPageAction, openRootFolderAction} from '../actions/initAction'

import home_icon from '../icons/home.svg'


class Reader extends Component {

 constructor(props, context) {
    super(props, context)

	    this.state = {
	      value: 0
	    }
	}

  chompLeft(s='', prefix=''){
    if (s.indexOf(prefix) === 0 ){
        return s.slice(prefix.length);
    
    }
    return s;
  }

  onChange = (value) => {

  	this.setState({
      value: value
    });

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
  		return <BreadcrumbItem href='#'>{folder}</BreadcrumbItem>;
  	})

    return (
      <div className='reader'>

         <header className="reader-header">
             <Breadcrumb className="bread-crumb">
	         	{breadcrumbs}
			</Breadcrumb>
          <img className='home-action' src={home_icon} onClick={this.props.openRoot} alt="Home" height="32" width="32"></img>
        </header>

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
 nextPage: (data) => dispatch(nextPageAction(data)),
 previousPage: (data) => dispatch(previousPageAction(data)) ,
 openRoot: (data) => dispatch(openRootFolderAction(data)) 

})

export default connect(mapStateToProps, mapDispatchToProps)(Reader);