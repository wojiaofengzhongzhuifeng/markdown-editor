import {Editor} from "../editor";
import {SetSelectionOperation} from "../operation";
import {debounce} from "../utils";

export class SelectionchangeEventHandler{
  editor: Editor
  wantToMultipleChoice: boolean // 用户想通过鼠标多选输入内容
  anchorOffset: number // 通过鼠标情况下多选内容，点击鼠标的位置
  focusOffset: number // 通过鼠标情况下多选内容，释放鼠标的位置

  constructor(editor: Editor) {
    this.init()
    this.editor = editor
  }
  _selectionchangeHandler(e: any){
    if(this.wantToMultipleChoice){return}
    let selection = window.getSelection()
    if(selection){
      const {anchorOffset, focusOffset} = window.getSelection() as Selection
      let op = new SetSelectionOperation(anchorOffset, focusOffset)
      op.apply(this.editor)
    }

  }

  // 鼠标点击
  _mouseDownHandler(e: MouseEvent){
    setTimeout(()=>{
      let selection = window.getSelection()
      if(selection){
        const { type, anchorOffset } = selection
        this.anchorOffset = anchorOffset
        this.wantToMultipleChoice = true
      }
    }, 0)

  }
  // 鼠标释放
  _mouseUpHandler(e: MouseEvent){
    setTimeout(()=>{
      let selection = window.getSelection()
      if(selection){
        const { type, focusOffset } = selection
        this.wantToMultipleChoice = false
        this.focusOffset = focusOffset
        const [smallNumber, bigNumber] = [this.anchorOffset, this.focusOffset].sort()
        let op = new SetSelectionOperation(smallNumber, bigNumber)
        op.apply(this.editor)
      }
    }, 0)
  }

  init(){
    setTimeout(()=>{
      this.editor.target.addEventListener('mousedown',this._mouseDownHandler.bind(this) )
      this.editor.target.addEventListener('mouseup',this._mouseUpHandler.bind(this) )

      document.addEventListener('selectionchange', this._selectionchangeHandler.bind(this))
    }, 0)
  }
}
export default SelectionchangeEventHandler
