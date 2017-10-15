import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import $ from 'jquery';
import styles from './InputTable.css';

class InputTableComponent extends Component {
    constructor(props) {
      super(props);
      this.handsontableData = [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13]
      ];
    }

  
    render() {
      return (
        <div id="parentContainer">
          <HotTable root="hot" className={`${styles.inputTableContainer}`}
          settings={{
              data: this.handsontableData,
              minRows: 1000,
              minCols:100,
              maxRows: 1000,
              maxCols:100,
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
              rowHeaders: function(index) {
                  if(index===0){
                      return "DB Column Name";
                  }
                  return index;
              }, 
              rowHeaderWidth:115,
              onAfterChange: (changes, source) => {
                if (source !== 'loadData') {
                  changes.forEach((change)=> {
                    if (change[2] !== change[3]) {
                      const cha = change[3].replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
                        switch (char) {
                          case '\0':
                            return '\\0';
                          case '\x08':
                            return '\\b';
                          case '\x09':
                            return '\\t';
                          case '\x1a':
                            return '\\z';
                          case '\n':
                            return '\\n';
                          case '\r':
                            return '\\r';
                          case '\"':
                          case '\'':
                          case '\\':
                          case '%':
                            // prepends a backslash to backslash, percent, and double/single quotes
                            return '\\' + char;
                        }
                      });                 
                      {/* reduxStore.dispatch({
                        id: reduxStore.getState().changes.length,
                        type: 'change',
                        row: change[0],
                        column: change[1],
                        oldValue: change[2],
                        newValue: cha
                      }); */}
                    }
                  });                  
                }
              }
            }}/>
          
        </div>
      );
    }
  }
  
  export default InputTableComponent;
  