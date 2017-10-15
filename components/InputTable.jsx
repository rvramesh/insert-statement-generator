import React, {Component} from 'react';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import $ from 'jquery';
import * as changeActions from '../actions/changeActions';
//import styles from './InputTable.css';

class InputTableComponent extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.handsontableData = [props.insertStatementState.columnNames, ...props.insertStatementState.data];

    this.changeColumn = props.actions.changeColumn;
    this.changeData = props.actions.changeData;
  }

  /* className={`${styles.inputTableContainer}`} */
  render() {
    let that=this;
    return (
      <div id="parentContainer" className="content">
        <HotTable
          root="hot"
          className="inputTableContainer"
          settings={{
          data: this.handsontableData,
          minRows: 1000,
          minCols: 100,
          maxRows: 1000,
          maxCols: 100,
          cells: function (row, col, prop) {
            if (row === 0) {
              return {
                renderer: function (instance, td, row, col, prop, value, cellProperties) {
                  Handsontable
                    .renderers
                    .TextRenderer
                    .apply(this, arguments);
                  $(td).css({'background': '#F1F1F1', 'font-weight': 'bold'});
                }
              };
            }
          },
          colHeaders: true,
          rowHeaders: function (index) {
            if (index === 0) {
              return "DB Column Name";
            }
            return index;
          },
          rowHeaderWidth: 115,
          onAfterChange: function(changes, source) {
            const getSourceDataAtRow = this.getSourceDataAtRow;
            let changedRows = [];
            let processedRows = {};
            let headerProcessed = false;
            if (source !== 'loadData') {
              changes.forEach((change) => {
                //change [row, col, oldVal, newVal]
                
                if(change[0] === 0 && headerProcessed===false){
                  //column change
                  that.changeColumn( change[1],change[3]);
                  headerProcessed=true;
                }
                else if (change[2] !== change[3] && !processedRows["id"+(change[0]-1)]) {
                  changedRows.push({ row:change[0]-1, data:getSourceDataAtRow(change[0])});
                  processedRows["id"+(change[0]-1)] = true;
                }
              });
              for(let changeData of changedRows)
              {
                that.changeData(changedRows);
              }
            }
          }
        }}/>

      </div>
    );
  }
}

export default InputTableComponent;
