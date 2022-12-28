import {Editor} from "../editor";
import {SetSelectionOperation} from "../operation";
import {debounce} from "../utils";

export class SelectionchangeEventHandler{
  editor: Editor

  constructor(editor: Editor) {
    this.init()
    this.editor = editor
  }
  _selectionchangeHandler(){
    let selection = window.getSelection()
    if(selection){
      const {anchorOffset, focusOffset} = window.getSelection() as Selection
      console.log(anchorOffset, focusOffset);
      let op = new SetSelectionOperation(anchorOffset, focusOffset)
      op.apply(this.editor)
    }

  }
  init(){
    document.addEventListener('selectionchange', this._selectionchangeHandler.bind(this))
  }
}
export default SelectionchangeEventHandler
