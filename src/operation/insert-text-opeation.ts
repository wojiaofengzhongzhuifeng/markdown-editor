import Operation from "./operation";
import {Editor} from "../editor";

export class InsertTextOperation extends Operation{
  editor: Editor
  spacers: string
  insertIndex: number

  constructor(editor: Editor, index: number, spacers: string) {
    super();
    this.editor = editor
    this.spacers = spacers
    this.insertIndex = index
  }
  apply(){
    this.editor.textModel.insert(this.insertIndex, this.spacers)
    super.apply() // 调用 operation 的公共apply 方法
  }
}
export default InsertTextOperation
