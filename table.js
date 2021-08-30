import {th} from './th.js'
import {tableStyle} from './tablestyle.js'
import {checkTitleExistence} from './checktitleexistance.js'
import {l} from "https://deno.land/x/html_dom@v1.0.2/html-dom.js"//'../../scripts/deps.js'


const identity = i => i
const defaultOptions = ({ columns: {}, style: 'normal', paged: 25, rows: false, header: true })
const table = (data,options)=>{
    options = Object.assign({}, defaultOptions, options);//merging object please see Mdn re. Object.assign
    const { sortable, rank, paged, header } = options;
    //header always true
    //d are data in the form of either array of Array or array of Object
    //c are boolean type, true mean we add column no as the row head
    let status = false
    let sortKey = undefined;
    let sortDescending = true;//from biggest to lowest
    let page = 0;
    //first we have to check if the data structure is array type
    if(Array.isArray(data)){status= true} else {
      return status //else will throw false return
    }
    //
    //if (sortable && rank) {
    //  throw new Error("A table can either be ranked or sortable, but not both");
    //}
    //check if Title exist in key or first column of data , otherwise we will create it automatically
    //isTitleExist will generate rowTitle, array of Title
    let {head,body} = checkTitleExistence(data)
    
    //debugger;
    const columns =[]
    Object.entries(head).forEach(([key, value]) => {
      //debugger;
      const opts = {...options.columns[key] , ...{title : value}};
      columns.push({
        key: key,
        type: opts.type || typeof body[0][key],
        options: opts
      });
    });
    //debugger;
    //let CopyOfData = data.slice()
    function bake() {
      if (sortKey) {
        body = body.slice().sort((a, b) => {
          let as = a[sortKey];
          let bs = b[sortKey];
          // make this sort stable
          if (as == bs) return JSON.stringify(a).localeCompare(JSON.stringify(b));
          let res = as > bs ? 1 : as < bs ? -1 : 0;
          if (sortDescending) res = -res;
          return res;
        });
      }
      let offset = page * paged;
      let rows = body.slice(offset, offset + (paged || body.length));
      let pages = paged ? Math.ceil(body.length / paged) : 1;
      let tableName = Object.keys({data})[0]
      
      return l.div(l.div([
          l.table([
            l.colgroup(l.col([],{class:'coWidthAuto'})),
            options.header === false ? ``:
            l.thead([
                rank?l.th(['No.']):``,
                ...columns.map(c=>th(c, sortKey, sortDescending, sortable))
            ]),
            l.tbody(rows.map((row,i)=>{
                return l.tr([
                    rank?l.th(offset + i + 1,{class:'cell-rank'}):``,
                    ...columns.map(c=>{
                        let displayValue = (c.options.formatter || identity)(
                            row[c.key],
                            i,
                            row
                          );
                          if (
                            displayValue instanceof window.HTMLElement &&
                            displayValue.tagName == "TD"
                          ) {
                            return displayValue;
                          }
                          return l.td(displayValue,{class:`cell-type-${c.type}`})
                    })
                ]);
            }))
              
          ],{id:tableName}),
          pages > 1 ? l.div([
            l.button('Previous',{'data-action':"previous"}),
            Array.from({ length: pages }).map(
                (_, i) => l.button(i + 1,{'data-page':i})
              )
          ],{class:'pretty-pager'}):``,
          tableStyle(tableName)
        ]
      ))
      
    }
    //debugger;
    let dom = bake();
    
    function rerender() {
      dom.firstChild.remove();
      dom.appendChild(bake().firstChild);
    }
    
    dom.addEventListener("click", e => {
      if (e.target.tagName === "TH" && sortable) {
        if (sortKey == e.target.dataset.key) {
          sortDescending = !sortDescending;
        }
        sortKey = e.target.dataset.key;
        //debugger;
        rerender();
      }
      if (e.target.tagName === "BUTTON") {
        if (e.target.dataset.action) {
          switch (e.target.dataset.action) {
            case "next":
              page++, rerender();
              break;
            case "previous":
              page--, rerender();
              break;
          }
        } else if (e.target.dataset.page) {
          (page = parseInt(e.target.dataset.page)), rerender();
        }
      }
    });
    
    return dom
  }

  export {table}