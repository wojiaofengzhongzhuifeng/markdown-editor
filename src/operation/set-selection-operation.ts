import {Editor} from "../editor";
import Operation from "./operation";

export class SetSelectionOperation extends Operation{
  anchorOffset: number
  focusOffset?: number
  constructor(anchorOffset: number, focusOffset?:number) {
    super();
    this.anchorOffset = anchorOffset
    this.focusOffset = focusOffset
  }
  apply(editor: Editor){
    editor.selectionModel.setSelection(this.anchorOffset, this.focusOffset)
    super.apply(editor)
  }
}
export default SetSelectionOperation
