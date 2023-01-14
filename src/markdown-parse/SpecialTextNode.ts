import TextNode, {TextNodeObj} from "./TextNode";
import LinkedNode from "./LinkedNode";

interface SpecialTextNodeObj extends TextNodeObj{
  relatedNode: LinkedNode
}

export default class SpecialTextNode extends TextNode{
  relatedNode: LinkedNode
  declare next: SpecialTextNode
  constructor(SpecialTextNodeObj: SpecialTextNodeObj) {
    super(SpecialTextNodeObj);
    this.relatedNode = SpecialTextNodeObj.relatedNode
  }
}
