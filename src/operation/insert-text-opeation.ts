import Operation from "./operation";
import {Editor} from "../editor";
import {TextModel} from "../model";

export class InsertTextOperation extends Operation{
  textModel: TextModel
  spacers: string
  insertIndex: number

  constructor(editor: Editor, index: number, spacers: string) {
    super();
    this.textModel = editor.textModel
    this.spacers = spacers
    this.insertIndex = index
  }
  apply(){
    this.textModel.insert(this.insertIndex, this.spacers)
    super.apply() // 调用 operation 的公共apply 方法
  }
}
export default InsertTextOperation
