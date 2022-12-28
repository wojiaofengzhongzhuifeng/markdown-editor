import {KeyboardEventHandler, SelectionchangeEventHandler} from "../event";
import {SelectionModel, TextModel} from "../model";
import SourceCodeView from "../view/source-code-view";
import {InsertTextOperation, SetSelectionOperation} from "../operation";
import RemoveTextOperation from "../operation/remove-text-operation";

export class Editor{
  target: HTMLElement
  eventHandler: KeyboardEventHandler
  selectionchangeEventHandler: SelectionchangeEventHandler
  textModel: TextModel
  selectionModel: SelectionModel
  view: SourceCodeView

  constructor(target: HTMLElement) {
    this.target = target
    this.init()
  }
  init(){
    this.eventHandler = new KeyboardEventHandler(this)// todo 已解决 这里传this 的作用是什么？this代表 editor 实例，相当于让 Event 引用 editor
    this.selectionchangeEventHandler = new SelectionchangeEventHandler(this)
    this.textModel = new TextModel(this)
    this.selectionModel = new SelectionModel(this)
    this.view = new SourceCodeView(this)

    this.eventHandler.addEventListener()
  }
  insertTextAtCursor(text: string){
    // 1. 通过 selection-model 选取模型判断是否有选区
    // 2. 生成原子操作，比如删除区间、插入字符串等（Operation） todo Operation 、model、editor 三层如何协作？
    // 3. 调用 text-model 数据模型，操作数据
    // 4. 调用selection-model 选取模型更新光标位置
    const currentSelection = this.selectionModel.getSelection()

    // 插入内容
    this.apply(new InsertTextOperation(currentSelection.anchorOffset, text))

    // 设置光标位置
    this.apply(new SetSelectionOperation(currentSelection.anchorOffset+1))
  }
  removeTextAtCursor(){
    const currentSelection = this.selectionModel.getSelection()

    // 执行删除操作
    this.apply(new RemoveTextOperation(currentSelection.anchorOffset))

    // 设置光标位置
    this.apply(new SetSelectionOperation(currentSelection.anchorOffset-1))

  }

  // todo 为什么要有这个方法？不直接 this.editor.textModel?
  getTextModel(){
    return this.textModel
  }
  apply(op: Operation){
    op.apply(this)
    if(op instanceof InsertTextOperation || op instanceof RemoveTextOperation){
      this.userOpList.push(op)
      this.actualOpList.push(op)
    }
  }
}
export default Editor

