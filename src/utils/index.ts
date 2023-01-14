import {StrongNode} from "../markdown-parse/StrongNode";

export function debounce(fn: Function, delay = 100){
  let timer = null
  return (...args: any) =>{
    timer = setTimeout(()=>{
      timer = null
      // @ts-ignore
      fn.apply(this,args)
    }, delay)
  }
}

export function isSpecialChar(string: string){
  return string.includes('*') || string.includes('~') || string.includes('![') || string.includes(']');
}
export function getMatchChar(char1: string, char2: string){

  if(char1 === '![' && char2 === ']'){
    return [char1, char2]
  } else {
    let firstIndex = 0,secondIndex = 0
    let result = ""
    while(char1[firstIndex] && char2[secondIndex]){
      if(char2[secondIndex] === char1[firstIndex]){
        result += char1[firstIndex]
      }
      firstIndex +=1
      secondIndex += 1
    }
    return [result]
  }

}

