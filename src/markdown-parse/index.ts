
// 输入： 123***456**789~123~456
// 输出： 123*<strong>456</strong>789<del>123</del>
function parseStrong(result: string[], ){
  // result = ['123', '*', '*', '456', '*', '*', '789']
  // 扩散字符串, 生成变更对象
  let diffList: {index: string, count: number  }[] = []
  result.forEach((itemString, index)=>{
    if(itemString !== '*'){
      let diffObj = {
        index: '',
        count: 0
      }
      let preIndex = index - 1
      let nextIndex = index + 1
      let preChar = result[preIndex]
      let nextChar = result[nextIndex]
      while(preChar && nextChar){
        if(preChar === '*' && nextChar === '*'){
          diffObj.count += 1
          // @ts-ignore
          diffObj.index = index
        }
        preIndex -= 1
        nextIndex += 1
        preChar = result[preIndex]
        nextChar = result[nextIndex]
      }
      if(diffObj.count){
        diffList.push(diffObj)
      }
    }
  })

  diffList.forEach((diffItem, index)=>{
    let step = 0
    while(Math.floor(diffItem.count/2)){

      if(Math.floor(diffItem.count/2)){
        // @ts-ignore
        let preIndex1 = diffItem.index - 1 - step
        // @ts-ignore
        let preIndex2 = diffItem.index - 2 - step

        let nextIndex1 = diffItem.index + 1 + step
        let nextIndex2 = diffItem.index + 2 + step

        let preChar1 = result[preIndex1]
        let preChar2 = result[preIndex2]
        let nextChar1 = result[nextIndex1]
        let nextChar2 = result[nextIndex2]
        if(preChar1 === '*' && preChar2 === '*' && nextChar1 === '*' && nextChar2 === '*'){

          result[preIndex2] = '<str'
          result[preIndex1] = 'ong>'

          result[nextIndex1] = '</str'
          result[nextIndex2] = 'ong>'
          step += 2

        }

        diffItem.count -= 2


      }
    }
  })
}
export function stringToPreview(test: string){
  let result: string[] = []
  for(let i=0;i<=test.length - 1;i++){
    if(test[i] === '*'){
      result.push(test[i])
    } else {
      let length
      if(result.length === 0){
        length = 0
      } else {
        length = result.length - 1
      }
      if(result[length] === '*'){
        length = result.length
      }
      result[length] === undefined ? result[length] = test[i]  : result[length] += test[i]
    }
  }



  // result = ['123', '*', '*', '456', '*', '*', '789']
  // 扩散字符串, 生成变更对象
  // let diffList: {index: string, count: number  }[] = []
  // result.forEach((itemString, index)=>{
  //   if(itemString !== '*'){
  //     let diffObj = {
  //       index: '',
  //       count: 0
  //     }
  //     let preIndex = index - 1
  //     let nextIndex = index + 1
  //     let preChar = result[preIndex]
  //     let nextChar = result[nextIndex]
  //     while(preChar && nextChar){
  //       if(preChar === '*' && nextChar === '*'){
  //         diffObj.count += 1
  //         // @ts-ignore
  //         diffObj.index = index
  //       }
  //       preIndex -= 1
  //       nextIndex += 1
  //       preChar = result[preIndex]
  //       nextChar = result[nextIndex]
  //     }
  //     if(diffObj.count){
  //       diffList.push(diffObj)
  //     }
  //   }
  // })
  //
  // diffList.forEach((diffItem, index)=>{
  //   let step = 0
  //   while(Math.floor(diffItem.count/2)){
  //
  //     if(Math.floor(diffItem.count/2)){
  //       // @ts-ignore
  //       let preIndex1 = diffItem.index - 1 - step
  //       // @ts-ignore
  //       let preIndex2 = diffItem.index - 2 - step
  //
  //       let nextIndex1 = diffItem.index + 1 + step
  //       let nextIndex2 = diffItem.index + 2 + step
  //
  //       let preChar1 = result[preIndex1]
  //       let preChar2 = result[preIndex2]
  //       let nextChar1 = result[nextIndex1]
  //       let nextChar2 = result[nextIndex2]
  //       if(preChar1 === '*' && preChar2 === '*' && nextChar1 === '*' && nextChar2 === '*'){
  //
  //         result[preIndex2] = '<str'
  //         result[preIndex1] = 'ong>'
  //
  //         result[nextIndex1] = '</str'
  //         result[nextIndex2] = 'ong>'
  //         step += 2
  //
  //       }
  //
  //       diffItem.count -= 2
  //
  //
  //     }
  //   }
  // })
  parseStrong(result)
  return result.join('')
}
