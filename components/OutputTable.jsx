import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import $ from 'jquery';
//import styles from './InputTable.css';

class OutputTableComponent extends Component {
    constructor(props) {
      
      super(props);
      
      
      debugger;
    }

  /* className={`${styles.inputTableContainer}`} */
    render() {
      const columnHeader=["--INSERT STATEMENTS"];
      const handsontableData = [
        [...columnHeader],
        ...this.props.insertStatementState.insertStatements
      ];
      debugger;
      return (
        <div id="opParentContainer">
          <HotTable root="hot2" 
          className="outputTableContainer"
          
          settings={{
              data: handsontableData,
              minRows: 1000,
              minCols:1,
              maxRows: 1000,
              maxCols:1,
              cells:function(row, col, prop) {
                    if (row === 0) {
                        return { 
                            
                                renderer:function(instance, td, row, col, prop, value, cellProperties) {
                                    Handsontable.renderers.TextRenderer.apply(this, arguments);
                                    $(td).css({
                                        'background': '#F1F1F1',
                                        'font-weight':'bold'
                                    });
                                }
                            
                        };
                    }
              },
              colHeaders: true,
              rowHeaders:true,
              stretchH:"all"
            }}/>
          
        </div>
      );
    }
  }
  
  export default OutputTableComponent;
  