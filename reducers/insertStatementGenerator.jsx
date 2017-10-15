import {COLUMN_CHANGE, TABLE_CHANGED, DATA_CHANGED} from '../constants/ActionTypes';

function getData(row, value) {
  let result = [];
  // Creates all lines:

  for (let j = 0; j < row; j++) {
    // Initializes:
    result[j] = value[j] || [];
  }
  return result;
}

let initialState = {

  data: getData(1000, [
    [
      "2016", "10", "11", "12"
    ],
    [
      "2016", "10", "11", "12"
    ],
    ["2016", "10", "11", "12"]
  ]),
  tableName: 'TableName',
  columnNames: ["Year", "Ford", "Volvo", "Toyota"]
};

initialState.insertStatements = generateInsertStatement(initialState.tableName, initialState.columnNames, initialState.data);

function computeInsertStatement(tableName, columnNames, values) {
  let val = [];
  for (let value of values) {
    if (value === null) {
      break;
    }
    else if(value === "NULL" || value==="null") {
      val.push("NULL");
      continue;
    }
    const sanitisedValue = value.replace(/[\0\x08\x09\x1a\n\r"'_&\\\%]/g, function (char) {
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
        case '\'':
          return '\'\'';
        case '\"':
        case '\\':
        case '%':
        case '_':
        case '&':
          return '\\' + char;
        default:
          return char;
      }
    });
    if (sanitisedValue !== null) {
      val.push(`'${sanitisedValue}'`);
    } else {
      val.push(NULL);
    }
  }
  return [`INSERT INTO ${tableName} (${columnNames.filter((name) => name !== null)}) VALES (${val});`];
}

function generateInsertStatement(tableName, columnNames, data) {
  let result = [];
  for (let da of data) {
    if (da.filter((d) => d !== null).length === 0) {
      result.push([]);
    } else {
      result.push(computeInsertStatement(tableName, columnNames, da));
    }
  }
  return result;
}

function changeArrayItem(array, value, index) {
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1)
  ]
};
export default function insertStatementGenerator(state = initialState, action) {
  debugger;
  switch (action.type) {
    case COLUMN_CHANGE:
      let columnNames = changeArrayItem(state.columnNames, action.columnName, action.col);
      return Object.assign({}, state, {
        columnNames: columnNames,
        insertStatements: generateInsertStatement(state.tableName, columnNames, state.data)
      });

    case TABLE_CHANGED:
      return Object.assign({}, state, {
        tableName: action.tableName,
        insertStatements: generateInsertStatement(action.tableName, state.columnNames, state.data)
      });

    case DATA_CHANGED:
      let data = state.data;
      let insertStatements = state.insertStatements;
      for(let changes of action.dataChanges)
      {
          data=changeArrayItem(data, changes.data,changes.rpw );

          insertStatements = changeArrayItem(insertStatements, 
            computeInsertStatement(state.tableName, 
              state.columnNames, changes.data), changes.row);
      }
       
      return Object.assign({}, state, {
        data: data,
        insertStatements: insertStatements
      });

    default:
      return state;
  }
}
