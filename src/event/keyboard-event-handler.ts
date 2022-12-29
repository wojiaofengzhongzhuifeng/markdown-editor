import {Editor} from "../editor";

export class KeyboardEventHandler{
  target: HTMLElement
  editor: Editor
  isComposition: boolean = false // 是否正在输入中文
  timeId: any

  constructor(editor: Editor) {
    this.target = editor.target
    this.editor = editor
  }

  private async _beforeInputHandler(e: InputEvent) {
    const inputType = e.inputType
    console.log('_beforeInputHandler', e);
    console.log(inputType);
    e.preventDefault()
    if (inputType === 'insertText') {
      const text = e.data
      if (text) {
        this.editor.insertTextAtCursor(text)
      }
    } else if (inputType === 'deleteContentBackward') {
      this.editor.removeTextAtCursor()
    } else if (inputType === 'insertParagraph') {
      this.editor.insertTextAtCursor("\n")
    } else if (inputType === 'insertFromPaste') {
      const textFromClipboard = await navigator.clipboard.readText();
      this.editor.insertTextAtCursor(textFromClipboard)
    } else if (inputType === 'insertCompositionText'){ // 用户输入中文
      this.timeId = setTimeout(()=>{
        console.log('this.isComposition', this.isComposition);
        if(this.isComposition){return}
        const text = e.data
        if(text){
          console.log('需要插入的文本内容是', text);
          this.editor.insertTextAtCursor(text)
        }
        clearTimeout(this.timeId)
      }, 0)


    }
  }

  private compositionstartHandler(e:InputEvent){
    console.log('compositionstartHandler', e);
    this.isComposition = true
  }
  private compositionendHandler(e: InputEvent){
    console.log('compositionendHandler', e);
    this.isComposition = false
  }

  addEventListener(){
    this.target.addEventListener('compositionstart', this.compositionstartHandler.bind(this))
    this.target.addEventListener('compositionend', this.compositionendHandler.bind(this))

    this.target.addEventListener('beforeinput', this._beforeInputHandler.bind(this)) // bind 的作用：将原本事件回调的this（触发元素）改成类的实例

  }
}
export default KeyboardEventHandler

