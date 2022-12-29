import {Editor} from "../editor";

export class KeyboardEventHandler{
  target: HTMLElement
  editor: Editor

  constructor(editor: Editor) {
    this.target = editor.target
    this.editor = editor
  }

  private _beforeInputHandler(e: InputEvent){
    const inputType = e.inputType
    e.preventDefault()
    if(inputType === 'insertText'){
      const text = e.data
      if(text){
        this.editor.insertTextAtCursor(text)
      }
    } else if (inputType === 'deleteContentBackward'){
      this.editor.removeTextAtCursor()
    } else if (inputType === 'insertParagraph'){
      this.editor.insertTextAtCursor("\n")
    }
  }

  addEventListener(){
    this.target.addEventListener('beforeinput', this._beforeInputHandler.bind(this)) // bind 的作用：将原本事件回调的this（触发元素）改成类的实例
  }
}
export default KeyboardEventHandler

