import Operation from "./operation";
import {Editor} from "../editor";
import {TextModel} from "../model";

export class InsertTextOperation extends Operation{
  spacers: string
  insertIndex: number

  constructor(index: number, spacers: string) {
    super();
    this.spacers = spacers
    this.insertIndex = index
  }
  apply(editor: Editor){
    editor.textModel.insert(this.insertIndex, this.spacers)
    super.apply(editor) // 调用 operation 的公共apply 方法
  }
}
export default InsertTextOperation
