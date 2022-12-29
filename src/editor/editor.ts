import {KeyboardEventHandler, SelectionchangeEventHandler} from "../event";
import {SelectionModel, TextModel} from "../model";
import SourceCodeView from "../view/source-code-view";
import {InsertTextOperation, SetSelectionOperation} from "../operation";
import RemoveTextOperation from "../operation/remove-text-operation";
import Operation from "../operation/operation";

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

    this.setAttributeToTarget()

    this.eventHandler.addEventListener()
  }
  insertTextAtCursor(text: string){
    // 1. 通过 selection-model 选取模型判断是否有选区
    // 2. 生成原子操作，比如删除区间、插入字符串等（Operation） todo Operation 、model、editor 三层如何协作？
    // 3. 调用 text-model 数据模型，操作数据
    // 4. 调用selection-model 选取模型更新光标位置
    const currentSelection = this.selectionModel.getSelection()

    // 判断当前是否多选文本内容，如果是的话，需要先将多选的文本内容删除，然后执行插入操作
    if(currentSelection.isMultipleSelect){
      let [smallNumber, bigNumber] = [currentSelection.anchorOffset, currentSelection.focusOffset].sort()
      let op = new RemoveTextOperation({
        removeStartIndex: smallNumber + 1,
        removeEndIndex: bigNumber
      })
      this.apply(op)
    }

    // 插入内容
    let op = new InsertTextOperation(currentSelection.anchorOffset+1, text)
    this.apply(op)

    // 设置光标位置
    let setSelectionOp = new SetSelectionOperation(currentSelection.anchorOffset+1)
    this.apply(setSelectionOp)
  }
  removeTextAtCursor(){
    const currentSelection = this.selectionModel.getSelection()

    // 执行删除操作
    let removeOp = new RemoveTextOperation({removeStartIndex: currentSelection.anchorOffset})
    this.apply(removeOp)

    // 设置光标位置
    let setSelectionOp = new SetSelectionOperation(currentSelection.anchorOffset-1)
    this.apply(setSelectionOp)

  }

  // todo 为什么要有这个方法？不直接 this.editor.textModel?
  getTextModel(){
    return this.textModel
  }
  apply(op: Operation){
    op.apply(this)
  }
  setAttributeToTarget(){
    this.target.style['white-space'] = 'pre-line'
  }
}
export default Editor

