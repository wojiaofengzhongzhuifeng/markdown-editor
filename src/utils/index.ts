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
