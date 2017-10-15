import React, { Component } from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as ChangeDataActions from '../actions/changeActions';


class App extends Component {
  
  render() {
    const { insertStatementState, actions } = this.props;
    return (
          <div>
            <Header modifyTable={actions.changeTable}/>
            <MainSection insertStatementState={insertStatementState} actions={actions}/>
          </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    insertStatementState: state.insertStatementGenerator
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChangeDataActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
