import Operation from "./operation";
import {Editor} from "../editor";

export class RemoveTextOperation extends Operation{
  removeStartIndex: number
  removeSpacers: string
  removeEndIndex: number


  constructor(obj: { removeStartIndex: number, removeEndIndex?: number, removeSpacers?: string }) {
    super();
    const {removeStartIndex, removeEndIndex, removeSpacers} = obj
    this.removeStartIndex = removeStartIndex
    this.removeEndIndex = removeEndIndex === undefined ? removeStartIndex : removeEndIndex
    if(removeSpacers !== undefined){
      this.removeSpacers = removeSpacers
    }
  }
  apply(editor: Editor){
    let removeSpacers = editor.textModel.remove(this.removeStartIndex, this.removeEndIndex)
    this.removeSpacers = removeSpacers
    super.apply(editor)
  }
}
export default RemoveTextOperation
