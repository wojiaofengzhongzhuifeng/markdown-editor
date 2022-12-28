import {Editor} from "../editor";

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
    let nodeList = this.editor.target.childNodes
    let node = nodeList[nodeList.length - 1]
    this.editor.view.renderSelection(node, anchorOffset, focusOffset)
  }

  // 判断是否多选
  isMultipleSelect(){
    return this.anchorOffset !== this.focusOffset;
  }
}
export default SelectionModel
