function accum(s) {
    
    const arr = []
    const newArr = []

        s.split("").forEach((item,index)=>{

            arr.push(item.repeat(index+1).toUpperCase())
        })

    arr.forEach(str=>{
        
        newArr.push(str.split(""))
    })

    newArr.forEach(arr=>{

        arr.forEach((str,i+1)=>{
            if(i != 0) {
                str.toLowerCase()
                console.log(i);

            }
        })
    })

    console.log(newArr);
  }

  console.log(accum(`abcd`));