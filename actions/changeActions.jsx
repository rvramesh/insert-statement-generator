import * as types from '../constants/ActionTypes';

export function changeData(row, data) {
  return { type: types.DATA_CHANGED, row, data };
}

export function changeTable(text) {
  return { type: types.TABLE_CHANGED, tableName: text };
}

export function changeColumn(col, text){
  return { type: types.COLUMN_CHANGE, col:col, columnName:text};
}