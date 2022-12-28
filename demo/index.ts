import { Editor} from "../src";

const container = document.getElementById('myEditor');
const undo = document.getElementById('undo')
if(container){
  let editor = new Editor(container)
  undo!.addEventListener('click', ()=>{
    editor.undo()
  })
}


console.log(container);
// let editor: Editor;
// if (container) {
//   editor = new Editor(container);
//
// }
