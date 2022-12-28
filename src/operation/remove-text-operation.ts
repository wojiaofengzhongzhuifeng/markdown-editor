import Operation from "./operation";
import {Editor} from "../editor";

export class RemoveTextOperation extends Operation{
  removeIndex: number
  removeSpacers: string

  constructor(removeIndex: number, removeSpacers?: string) {
    super();
    this.removeIndex = removeIndex
    if(removeSpacers !== undefined){
      this.removeSpacers = removeSpacers
    }
  }
  apply(editor: Editor){
    let removeSpacers = editor.textModel.remove(this.removeIndex)
    this.removeSpacers = removeSpacers
    super.apply(editor)
  }
}
export default RemoveTextOperation
