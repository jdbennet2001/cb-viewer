import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import Browser from './components/Browser'
import Reader  from './components/Reader'

import {initAction} from './actions/initAction'

const CB_SERVER_URL = "http://localhost:2002/model";

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
    })
    
  }

  /* Render either the file browser or the archive reader */
  render() {

    return (
      <Browser>    
      </Browser>
    );
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
 simpleAction: (data)  => dispatch(initAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

