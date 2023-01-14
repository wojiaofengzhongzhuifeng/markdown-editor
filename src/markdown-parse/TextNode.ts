import LinkedNode, {LinkedNodeObj} from "./LinkedNode";
export interface TextNodeObj extends LinkedNodeObj{
  value: string
}
export default class TextNode extends LinkedNode{
  value: string
  constructor(obj: TextNodeObj) {
    super(obj);
    this.value = obj.value
  }
}
