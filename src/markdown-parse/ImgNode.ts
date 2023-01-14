import LinkedNode, {LinkedNodeObj} from "./LinkedNode";

interface ImgNodeObj extends LinkedNodeObj{
  alt: string
  imgUrl: string
}

export class ImgNode extends LinkedNode{
  alt: string
  imgUrl: string
  constructor(obj: ImgNodeObj) {
    super(obj);
    this.alt = obj.alt
    this.imgUrl = obj.imgUrl
  }
}
