export  function deepCopy(data){
    let res ;
    if(!(data instanceof Object)){
      res = data;
      return res
    }
    if(Array.isArray(data)){
      res = [];
    }
    if(data.constructor === Object) {
      res = []
    }
    for(let k in data){
      res[k] = (data[k] instanceof Object) ? deepCopy(data[k]) : data[k]
    }
  
    return res
  }
  