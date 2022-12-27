import {Editor} from "../editor";

export class TextModel{
  editor: Editor
  _spacers: string

  constructor(editor: Editor) {
    this.editor = editor
    this._spacers = editor.target.innerHTML
  }
  insert(index: number, spacers: string){
    this._spacers = this._spacers.slice(0, index) + spacers + this._spacers.slice(index)

    // todo 这里要发送事件 text-change 给view 层，让view 层更新视图，也就说，如何去定义一个自定义的事件？
    // todo 为什么不直接在model 层，调用view 层的render 方法，也就是说，事件发布订阅与直接调用函数这两种通信方式，使用场景是什么？
    this.editor.view.render()
  }
  getAllSpacers(){
    return this._spacers
  }
}
export default TextModel
