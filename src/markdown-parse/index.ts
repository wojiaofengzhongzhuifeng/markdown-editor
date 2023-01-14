
// 输入： 123***456**789~123~456
// 输出： 123*<strong>456</strong>789<del>123</del>
import TextNode from "./TextNode";
import {getMatchChar, isSpecialChar} from "../utils";
import SpecialTextNode from "./SpecialTextNode";
import {StrongNode} from "./StrongNode";
import {DelNode} from "./DelNode";
import {ItalicsNode} from "./ItalicsNode";
import {ImgNode} from "./ImgNode";

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

export function parse(string: string){
  let spcecialCharArray = [0]
  for(let i=0;i<=string.length - 1;i++){
    let char = string[i]
    if(char.includes("*")){
      let count = 1
      let index = i
      while(char.includes(string[index + count])){
        count += 1
      }
      i += count
      spcecialCharArray.push(...[index, count + index])
    }

    if(char.includes("~")){
      let count = 1
      let index = i
      while(char.includes(string[index + count])){
        count += 1
      }
      i += count

      spcecialCharArray.push(...[index, count + index])
    }

    if(char.includes('!')){
      let nextChar = string[i + 1]
      if(nextChar && nextChar === '['){
        spcecialCharArray.push(...[i,i+2])
      }
    }
    if(char.includes(']')){
      spcecialCharArray.push(...[i,i+1])
    }

    if(char.includes('(')){
      let count = 1
      let index = i
      while(!(')'.includes(string[index + count])) || index + count <char.length){
        count += 1
      }
      i += count
      console.log(index);
      console.log(count + index + 1);
      spcecialCharArray.push(count + index+1)
    }

  }
  let lastCharIndex = spcecialCharArray[spcecialCharArray.length - 1]
  if(lastCharIndex !== string.length){
    spcecialCharArray.push(string.length)
  }
  // if(spcecialCharArray[spcecialCharArray.length - 1] ){}
  console.log(spcecialCharArray);

  let currentNode = null
  let charLinkedList = null
  for(let i=0;i<=spcecialCharArray.length - 1;i++){
    let slowP = i
    let fastP = i+1
    let startIndex = spcecialCharArray[slowP]
    let endIndex = spcecialCharArray[fastP]
    if(startIndex !== undefined && endIndex !== undefined){
      let result = string.slice(startIndex, endIndex)
      let textNode = new TextNode({value: result})
      if(currentNode){
        currentNode.next = textNode
      }
      currentNode = textNode
      if(i === 0){
        charLinkedList = textNode
      }
    }
  }
  console.log(charLinkedList);
  // 遍历链表
  let specialCharLinkedList
  let currentNode1 = null
  let p = charLinkedList
  while(p){
    if(isSpecialChar(p.value)){
      let sp = new SpecialTextNode({relatedNode: p, value: p.value})
      if(currentNode1){
        currentNode1.next = sp
      }
      if(!specialCharLinkedList){
        specialCharLinkedList = currentNode1
      }
      currentNode1 = sp

    }
    // @ts-ignore
    p = p.next

  }
  console.log(specialCharLinkedList);


  // 快慢双指针遍历第二条链表，检查配对情况
  let slow: SpecialTextNode | null | undefined = specialCharLinkedList
  while(slow){
    let fast: SpecialTextNode | null | undefined = slow.next
    if(fast && slow){
      let [matchChar1, matchChar2] = getMatchChar(slow.value, fast.value)
      if(matchChar2){
        // 处理图片和超链接
        // 1. 修改第一、二条链表
        slow.value = slow.value.replace(matchChar1, "")
        fast.value = fast.value.replace(matchChar2, "")

        slow.relatedNode.value = slow.relatedNode.value!.replace(matchChar1, "")
        fast.relatedNode.value = fast.relatedNode.value!.replace(matchChar2, "")

        let specialNode = createNodeBySpeicalChar(slow, matchChar1)
        let tempNext = slow.relatedNode.next!.next!.next!.next

        slow.relatedNode.next = specialNode
        specialNode!.next = tempNext



      } else {
        // 处理加粗、斜体、删除线
        if(matchChar1){
          // 1. 修改第一、二条链表
          slow.value = slow.value.replace(matchChar1, "")
          fast.value = fast.value.replace(matchChar1, "")

          slow.relatedNode.value = slow.relatedNode.value!.replace(matchChar1, "")
          fast.relatedNode.value = fast.relatedNode.value!.replace(matchChar1, "")

          let specialNode = createNodeBySpeicalChar(slow, matchChar1)
          let tempNext = slow.relatedNode.next!.next!.next

          slow.relatedNode.next = specialNode
          specialNode!.next = tempNext

        }

      }
    }
    // @ts-ignore
    slow = slow.next

  }

  console.log(charLinkedList);

}

export function createNodeBySpeicalChar(specialNode: SpecialTextNode, char: string){
  if(char === '**'){
    return new StrongNode({firstChild: specialNode.relatedNode.next})
  } else if(char === '~'){
    return new DelNode({firstChild: specialNode.relatedNode.next})
  } else if(char === '*'){
    return new ItalicsNode({firstChild: specialNode.relatedNode.next})
  } else if (char === '!['){
    // @ts-ignore
    return new ImgNode({firstChild: specialNode.relatedNode.next, alt: specialNode.relatedNode.next!.value, imgUrl: specialNode.relatedNode.next.next.next!.value})

  }
  else {
    throw new Error("未知分隔符")
  }
}



