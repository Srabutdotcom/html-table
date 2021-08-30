import {l} from '../../scripts/deps.js'

const th = (c, sortKey, sortDescending, sortable) => {
    let {
      options: { title }
    } = c;
    //debugger;
    if(!isNaN(c.key))c.key = c.key.toString();
    //debugger;
    let sortIndicator = sortKey && sortDescending ? "↑" : "↓";
    let arrow = l.span([sortIndicator],{style:`${sortKey === c.key ? "display:block" : "display:none"}`}) 
    
    /* html`<span style='${
      sortKey === c.key ? "display:block" : "display:none"
    }'>${sortIndicator}</span>`; */
    
    let displayedTitle = title !== undefined ? title : c.key;//debugger;

    return c.type === "number" ?
    l.th([arrow, displayedTitle],{'data-key':`${c.key}`,class:`column-type-${c.type} ${sortable ? "sortable" : ""}`}) :
    l.th([displayedTitle, arrow],{'data-key':`${c.key}`,class:`column-type-${c.type} ${sortable ? "sortable" : ""}`}) 
      
    /* ? html`<th
        data-key="${c.key}"
        class='column-type-${c.type} ${sortable ? "sortable" : ""}'>
          ${arrow} ${displayedTitle}
      </th>`
      : html`<th
        data-key="${c.key}"
        class='column-type-${c.type} ${sortable ? "sortable" : ""}'>
          ${displayedTitle} ${arrow}
      </th>`; */
  }

export {th}