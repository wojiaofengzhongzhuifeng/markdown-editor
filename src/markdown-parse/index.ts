
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
  console.log('输入字符串', string);

  // 对用户输入字符串进行分割，生成特殊字符串的index位置，方便生成链表
  const { spcecialCharArray } = createSpcecialCharArray(string)

  // 根据特殊字符串的 index位置， 生成两个链表
  const {allCharLinkedListList, specialCharLinkedListList} = createTwoLinkedList(spcecialCharArray)


  /*
  //
   - 双指针遍历第二个链表，找到能匹配的特殊字符串，如果能匹配到，做以下事情
   - 找到链表1对应的两个node节点 node1, node2
   - 找到 node1, node2 前一个节点（双指针）
   - 创建新节点 newNode ，让 newNode.children = node1.next
   - 删除 node1, node2 节点匹配的字符串
    - 如果删除完后，node1字符串 === "" && node2字符串 === "", 那么node1.前一个节点.next = newNode && newNode.next = node2.next && node2.前一个节点 = null
    - 如果删除完后，node1字符串 !== "" && node2字符串 === "", 那么node1.next = newNode && newNode.next = node2.next && node2.前一个节点 = null
    - 如果删除完后，node1字符串 === "" && node2字符串 !== "", 那么node1.前一个节点.next = newNode && newNode.next = node2 && node2.前一个节点 = null
   */




  let slowPoint = specialCharLinkedListList
  if(slowPoint){
    // while(slowPoint){
    //   let slowPointChar = slowPoint.value
    //   let fastPointChar = fastPoint.value
    //   if(slowPointChar.includes(fastPointChar) ||fastPointChar.includes(slowPointChar)){
    //     let matchChar = slowPointChar.length >= fastPointChar.length ? fastPointChar : slowPointChar
    //     console.log(matchChar);
    //   } else {
    //     fastPoint = fastPoint.next
    //   }
    //   slowPoint = slowPoint.next
    // }
    console.log(specialCharLinkedListList!.getString());
    while(slowPoint){
      let fastPoint = slowPoint.next
      while(fastPoint){
        let slowPointChar = slowPoint.value
        let fastPointChar = fastPoint.value
        if(slowPointChar.includes(fastPointChar) ||fastPointChar.includes(slowPointChar)){
          let matchChar = slowPointChar.length >= fastPointChar.length ? fastPointChar : slowPointChar
          console.log(matchChar);
          break;
        }
        fastPoint = fastPoint.next
      }
      slowPoint = slowPoint.next
    }
  }




  // 帮助函数
  function addSpecialCharIndex(spcecialCharArray: number[][], index:number, count:number){
    if(spcecialCharArray[spcecialCharArray.length - 1] && spcecialCharArray[spcecialCharArray.length - 1][1] > index){

    } else {
      spcecialCharArray.push([index, count + index])
    }
  }

  function createSpcecialCharArray(string:string){
    let spcecialCharArray: number[][] = []
    for(let i=0;i<=string.length - 1;i++){
      let char = string[i]
      if(char.includes("*")){
        let count = 1
        let index = i
        while(char === string[index + count]){
          count += 1
        }
        addSpecialCharIndex(spcecialCharArray, index, count)
      }

      if(char.includes("~")){
        let count = 1
        let index = i
        while(char === string[index + count]){
          count += 1
        }

        addSpecialCharIndex(spcecialCharArray, index, count)
      }

      if(char.includes('!')){
        let nextChar = string[i + 1]
        if(nextChar && nextChar === '['){
          addSpecialCharIndex(spcecialCharArray, i, i+2)
        }
      }
      if(char.includes(']')){
        addSpecialCharIndex(spcecialCharArray, i, i+1)
      }

      if(char.includes('(')){
        let count = 1
        let index = i
        while(!(')'.includes(string[index + count])) || index + count <char.length){
          count += 1
        }
        addSpecialCharIndex(spcecialCharArray, index, count + index+1)

      }

    }
    return {spcecialCharArray}
  }

  function createTwoLinkedList(spcecialCharArray: number[][]){
    // todo bug: 遇到 1***~2~**3*4*5 会出现问题
    let allCharLinkedListHead = null;
    let allCharLinkedListList = null;

    let specialCharLinkedListHead = null;
    let specialCharLinkedListList = null;

    for(let i = 0;i<=spcecialCharArray.length - 1;i++){
      let currentArray = spcecialCharArray[i]
      let nextArray = spcecialCharArray[i+1]

      let specialChar = string.slice(...currentArray)
      let specialCharNode = new TextNode({value: specialChar})
      let specialCharNode1 = new SpecialTextNode({value: specialChar, relatedNode: specialCharNode})


      if(!allCharLinkedListHead){
        allCharLinkedListHead = specialCharNode
        allCharLinkedListList = specialCharNode
      } else {
        allCharLinkedListHead.next = specialCharNode
        allCharLinkedListHead = specialCharNode
      }

      if(!specialCharLinkedListHead){
        specialCharLinkedListHead = specialCharNode1
        specialCharLinkedListList = specialCharNode1
      } else {
        specialCharLinkedListHead.next = specialCharNode1
        specialCharLinkedListHead = specialCharNode1
      }


      if(currentArray && nextArray){
        if(currentArray[1] !== nextArray[0]){
          // 存在普通字符串
          let specialChar = string.slice(currentArray[1], nextArray[0])
          let textNode = new TextNode({value: specialChar})
          // console.log('所有', textNode);
          if(!allCharLinkedListHead){
            allCharLinkedListHead = textNode
            allCharLinkedListList = textNode
          } else {
            allCharLinkedListHead.next = textNode
            allCharLinkedListHead = textNode
          }


        }
      }
    }
    console.log(allCharLinkedListList, specialCharLinkedListList);
    return {allCharLinkedListList, specialCharLinkedListList};
  }

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



