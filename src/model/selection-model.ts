import {Editor} from "../editor";
import SourceCodeAndPreview from "../view/source-code-and-preview";

export class SelectionModel{
  editor: Editor
  anchorOffset: number
  focusOffset: number
  constructor(editor: Editor) {
    this.editor = editor
    this.anchorOffset = 0 // 点击鼠标的位置
    this.focusOffset = 0  // 释放鼠标的位置
  }

  getSelection(){
    return {
      anchorOffset: this.anchorOffset,
      focusOffset: this.focusOffset,
      isMultipleSelect: this.isMultipleSelect()
    }
  }

  setSelection(anchorOffset: number, focusOffset?: number){
    if(this.anchorOffset === anchorOffset && this.focusOffset === focusOffset){return}
    this.anchorOffset = anchorOffset
    this.focusOffset = focusOffset === undefined ?  anchorOffset : focusOffset

    let node
    if(this.editor.view instanceof SourceCodeAndPreview){
      let nodeList = this.editor.target.childNodes
      node = nodeList[0].childNodes[0]
    } else {
      let nodeList = this.editor.target.childNodes
      node = nodeList[nodeList.length - 1]
    }

    this.editor.view.renderSelection(node, anchorOffset, focusOffset)
  }

  // 判断是否多选
  isMultipleSelect(){
    return this.anchorOffset !== this.focusOffset;
  }

  // 光标处于编辑内容末尾
  isSelectionAtLast(){
    return this.editor.getTextModel()._spacers.length === this.focusOffset;
  }
}
export default SelectionModel
