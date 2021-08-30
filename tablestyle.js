import {l} from '../../scripts/deps.js'
const tableStyle =(tableName,coWidthAuto = ' .coWidthAuto {width:auto;}')=> {
    //debugger;
    
    return (
    l.style([
        `#${tableName} {
            table-layout: fixed;
            width: auto;
          }
          #${tableName}${coWidthAuto} 
          #${tableName} thead th,
          #${tableName} thead th span,
          #${tableName} tbody th {
            background-color: #3f87a6;
            color: #fff;
          }
          #${tableName} thead th, 
          #${tableName} tbody td, 
          #${tableName} tbody th {
            padding: 5px 8px 5px 8px;
            outline: 1px solid Snow;
          }
          #${tableName} tbody td,
          #${tableName} tbody th {
            text-align: center;
            
          }
          #${tableName} thead th {
            text-align: center;
          }
          #${tableName} thead th.sortable {
            cursor: pointer;
          }
          #${tableName} tbody tr:nth-child(odd) {
            background-color: WhiteSmoke ;
          }
          
          #${tableName} tbody tr:nth-child(even) {
            background-color: Gainsboro ;
          }
          `
    ],{type:"text/css"})
    )   
  }

export {tableStyle}