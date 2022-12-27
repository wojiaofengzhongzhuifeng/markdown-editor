import Operation from "./operation";
import {Editor} from "../editor";
import {TextModel} from "../model";

export class RemoveTextOperation extends Operation{
  removeIndex: number
  textModel: TextModel

  constructor(editor: Editor, removeIndex: number) {
    super();
    this.removeIndex = removeIndex
    this.textModel = editor.textModel
  }
  apply(){
    this.textModel.remove(this.removeIndex)
    super.apply()
  }
}
export default RemoveTextOperation
