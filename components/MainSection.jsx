import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';

import InputTableComponent from "./InputTable"
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: SHOW_ALL
    };
  }

  render() {
    return (
      <section className="main">
        
          <Row>
            <Col><InputTableComponent/></Col>
            <Col></Col>
          </Row>
        
      </section>
    );
  }
}

export default MainSection;
