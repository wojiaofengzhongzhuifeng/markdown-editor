import SourceCodeView from "./source-code-view";
import {Editor} from "../editor";
import {stringToPreview} from "../markdown-parse";

export default class SourceCodeAndPreview extends SourceCodeView{
  constructor(editor: Editor) {
    super(editor);
  }
  render() {
    this.target.classList.add('rjj-source-code-and-preview')
    let text = this.textModel.getAllSpacers() + '\n'
    this.target.innerHTML = `<div class="rjj-source-code-and-preview-coder" contenteditable>${text}</div><div class="rjj-source-code-and-preview-previewer">${stringToPreview(text)}</div>`
  }
}
