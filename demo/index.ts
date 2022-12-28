import { Editor} from "../src";
import {withUndo, WithUndoEditor} from '../src/plugin'

const container = document.getElementById('myEditor');
const undo = document.getElementById('undo')
if(container){
  let editor = new Editor(container)
  let witheUndoEditor = withUndo(editor) as WithUndoEditor
  undo!.addEventListener('click', ()=>{
    witheUndoEditor.undo()
  })
}


console.log(container);
// let editor: Editor;
// if (container) {
//   editor = new Editor(container);
//
// }
