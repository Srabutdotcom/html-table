const isObject=(obj)=>{
    return obj === Object(obj);
  }

const invert = function (obj) {
    const new_obj = {};
  
    for (const [key,val] of Object.entries(obj)) {
      //debugger;
        new_obj[key] = key;
    }
  
    return new_obj;
};

const checkTitleExistence =(data)=>{
    // This is important thing as all of the data in the row must be consistent
    // if keys are string than it is the title
    // otherwise we should compare the content at index 0 and index 1.
    // if the content type are different ie. between string and number than it is eligible to be a title
    let r0 = data[0]
    let rowTitle = []
    let headKeys = {}
    let newdata = undefined
    //debugger;
    let title = false // assuming there is not title in row 1.
    if(Array.isArray(r0)){//if r0 are in the form of array than keys are the indexs
      let r1 = data[1]
      let i = 0
      title = r0.some(e=>{
        let bol = typeof r1[i]!== typeof e
        i++
        //debugger;
        return bol 
      })
      if(title){// jika terdapat title pada row 0 maka pisahkan row 0 dengan real data setelah row 0 
        rowTitle= r0.map((e,i)=>{
          //debugger;
          headKeys[i]=`${e}`//.split(/\s+/).join('')}`//this automated title created based on keys
         })
        //debugger;
        newdata = data.slice(1)
      } else {
        //debugger;
        rowTitle = r0.map((e,i)=>{
          //debugger;
          headKeys[i]=`c${e}`//.split(/\s+/).join('')}`//this automated title created based on keys
         })
      }
    } else if (isObject(r0)){
      headKeys = invert(r0)
      //rowTitle = Object.keys(r0).map(e=>e.split(/\s+/).join(''))
      //debugger
    } 
    return {
      head:headKeys,
      body:newdata ||data
    }
  }

export {checkTitleExistence}