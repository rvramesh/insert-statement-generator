import React, { PropTypes, Component } from 'react';

import { Button } from 'reactstrap';


const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
         <nav className="navbar navbar-expand-md navbar-dark bg-indigo">
         <a className="navbar-brand" href="#">Insert Clause Generator</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
   
         <div className="collapse navbar-collapse" id="navbarsExampleDefault">
           
         </div>
       </nav>
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
