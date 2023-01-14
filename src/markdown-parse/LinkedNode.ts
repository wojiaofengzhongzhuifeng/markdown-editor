
export interface LinkedNodeObj {
  next?: LinkedNode
  pre?: LinkedNode
  firstChild?: LinkedNode
  value?: string
}
export default class LinkedNode {
  next?: LinkedNode
  pre?: LinkedNode
  firstChild?: LinkedNode
  value?: string
  constructor(obj: LinkedNodeObj) {
    this.next = obj.next
    this.pre = obj.pre
    this.firstChild = obj.firstChild
    this.value = obj.value
  }
}
