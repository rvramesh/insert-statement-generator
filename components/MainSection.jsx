import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';

import InputTableComponent from "./InputTable"
import OutputTableComponent from "./OutputTable"

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    
  }

  render() {
    const { insertStatementState, actions } = this.props;
    return (
      <section className="main box">
          <Row noGutters={true} style={{"flex": "1 1 auto"}}>
            <Col style={{"borderRight":"2px solid indigo"}}>
              <InputTableComponent actions={actions} insertStatementState={insertStatementState}/>
            </Col>
            <Col><OutputTableComponent insertStatementState={insertStatementState}/></Col>
          </Row>
        
      </section>
    );
  }
}

export default MainSection;
