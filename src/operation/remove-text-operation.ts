import Operation from "./operation";
import {Editor} from "../editor";

export class RemoveTextOperation extends Operation{
  removeIndex: number

  // todo 能否通过一定的方法，去除 editor 传入参数？
  constructor(removeIndex: number) {
    super();
    this.removeIndex = removeIndex
  }
  apply(editor: Editor){
    editor.textModel.remove(this.removeIndex)
    super.apply(editor)
  }
}
export default RemoveTextOperation
