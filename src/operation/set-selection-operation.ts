import {Editor} from "../editor";
import Operation from "./operation";

export class SetSelectionOperation extends Operation{
  editor: Editor
  anchorOffset: number
  focusOffset?: number
  constructor(editor: Editor, anchorOffset: number, focusOffset?:number) {
    super();
    this.editor = editor
    this.anchorOffset = anchorOffset
    this.focusOffset = focusOffset
  }
  apply(){
    this.editor.selectionModel.setSelection(this.anchorOffset, this.focusOffset)
    super.apply()
  }
}
export default SetSelectionOperation
