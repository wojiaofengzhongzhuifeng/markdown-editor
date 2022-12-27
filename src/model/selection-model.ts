// export class SelectionModel{
//
//
//   constructor(editor) {
//     this.editor = editor
//     this.anchorOffset = 0 // 点击鼠标的位置
//     this.focusOffset = 0  // 释放鼠标的位置
//   }
//
//   getSelection(){
//     return {
//       anchorOffset: this.anchorOffset,
//       focusOffset: this.focusOffset
//     }
//   }
//
//   setSelection(anchorOffset, focusOffset){
//     if(this.anchorOffset === anchorOffset && this.focusOffset === focusOffset){return}
//     this.anchorOffset = anchorOffset
//     this.focusOffset = focusOffset
//     let nodeList = this.editor.target.childNodes
//     let node = nodeList[nodeList.length - 1]
//     this.editor.view.renderSelection(node, anchorOffset, focusOffset)
//   }
// }
// export default SelectionModel
