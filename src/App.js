import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import Browser from './components/Browser'
import Reader  from './components/Reader'

import {initAction} from './actions/initAction'

const CB_SERVER_URL = `http://${window.location.hostname}:2002/model?key=${Date.now()}`;

/*
 Main class for the CB - Viewer Application
 */
class App extends Component {


  /* Load model at program start up */
  componentDidMount(){
    let action = this.props.simpleAction;

    fetch(CB_SERVER_URL).then(response => {
      return response.json()
    }).then(jsondata => {
      return action(jsondata);
    }).catch(err =>{
      debugger;
      console.err(`Error fetching catalog data: ${err.message}`);
    })
    
  }

  /* Render either the file browser or the archive reader */
  render() {

    if ( this.props.model.state === 'BROWSING'){
      return <Browser model={this.props.model}></Browser>
    }else if (this.props.model.state === 'READING'){
      return <Reader model={this.props.model}></Reader>
    }else{
      return <div>Loading...</div>
    }

  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: (data)  => dispatch(initAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

