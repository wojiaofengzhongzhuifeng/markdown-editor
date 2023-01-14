import { Editor} from "../src";
import {withUndo, WithUndoEditor} from '../src/plugin'
import {parse} from "../src/markdown-parse";

const container = document.getElementById('myEditor');
const undo = document.getElementById('undo')
if(container){
  let editor = new Editor(container)
  let witheUndoEditor = withUndo(editor) as WithUndoEditor
  undo!.addEventListener('click', ()=>{
    witheUndoEditor.undo()
  })
}

parse('123![456](https://avatars.githubusercontent.com/u/25478678?v=4)789')
// let editor: Editor;
// if (container) {
//   editor = new Editor(container);
//
// }
