// export class Editor{
//   protected target: HTMLDivElement
//   protected eventHandler:
//
//   constructor(target: HTMLDivElement) {
//     this.target = target
//     this.init()
//   }
//   init(){
//     this.eventHandler = new KeyboardEventHandler(this.target, this)// todo 已解决 这里传this 的作用是什么？this代表 editor 实例，相当于让 Event 引用 editor
//     this.selectionchangeEventHandler = new SelectionchangeEventHandler(this)
//     this.textModel = new TextModel(this.target.innerHTML, this)
//     this.selectionModel = new SelectionModel(this)
//     this.view = new SourceCodeView(this.textModel, this.selectionModel, this.target)
//
//     this.eventHandler.addEventListener()
//   }
//   insertTextAtCursor(text){
//     // 1. 通过 selection-model 选取模型判断是否有选区
//     // 2. 生成原子操作，比如删除区间、插入字符串等（Operation） todo Operation 、model、editor 三层如何协作？
//     // 3. 调用 text-model 数据模型，操作数据
//     // 4. 调用selection-model 选取模型更新光标位置
//     const currentSelection = this.selectionModel.getSelection()
//
//     // 插入内容
//     const insertOperation = new InsertTextOperation(this, currentSelection.startIndex, text)
//     insertOperation.apply();
//
//     // 设置光标位置
//     const setSelectionOperation = new SetSelectionOperation(this, currentSelection.startIndex+1)
//     setSelectionOperation.apply();
//   }
// }
