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

// parse('1![t](https://www.baidu.com)4***7**a~b~c*d*')
parse('1![t](https://www.baidu.com)4')
// parse('4**7**1')

// let editor: Editor;
// if (container) {
//   editor = new Editor(container);
//
// }
