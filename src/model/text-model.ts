import {Editor} from "../editor";

export class TextModel{
  editor: Editor
  _spacers: string

  constructor(editor: Editor) {
    this.editor = editor
    this._spacers = editor.target.innerHTML
  }
  // 注意：假设现有 abcd ，那么想在末尾新增e，index 应该是5， spacers应该是e，即起始index === 1
  insert(index: number, spacers: string){
    this._spacers = this._spacers.slice(0, index - 1) + spacers + this._spacers.slice(index - 1)

    // todo 这里要发送事件 text-change 给view 层，让view 层更新视图，也就说，如何去定义一个自定义的事件？
    // todo 为什么不直接在model 层，调用view 层的render 方法，也就是说，事件发布订阅与直接调用函数这两种通信方式，使用场景是什么？
    this.editor.view.render()
  }
  // 注意：假设现有 abcd ，那么想在删除 bc ,那么 removeStartIndex 应该是 2， removeEndIndex 应该是 3

  remove(removeStartIndex: number, removeEndIndex?: number): string{
    console.log('removeStartIndex', removeStartIndex);
    console.log('removeEndIndex', removeEndIndex);

    let removeString = this._spacers.slice(removeStartIndex, removeStartIndex + 1)
    this._spacers = this._spacers.slice(0, removeStartIndex - 1) + this._spacers.slice(removeEndIndex)
    this.editor.view.render()
    return removeString
  }
  getAllSpacers(){
    return this._spacers
  }
}
export default TextModel
