import {SelectionModel, TextModel} from "../model";
import {Editor} from "../editor";

export class SourceCodeView{
  textModel: TextModel
  selctionModel: SelectionModel
  target: HTMLElement
  constructor(editor: Editor) {
    this.textModel = editor.textModel
    this.selctionModel = editor.selectionModel
    this.target = editor.target
  }
  render(){
    this.target.innerHTML = this.textModel.getAllSpacers() + '\n'
  }
  renderSelection(node: Node, anchorOffset: number, focusOffset?: number){
    let range = document.createRange()
    let selection = window.getSelection()
    if(selection && node){
      anchorOffset !== undefined && range.setStart(node, anchorOffset)
      focusOffset !== undefined && range.setEnd(node, focusOffset)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

}
export default SourceCodeView
