// @ts-nocheck todo 尝试删除这个
import {Editor} from "../editor";
import Operation from "../operation/operation";
import {InsertTextOperation} from "../operation";
import RemoveTextOperation from "../operation/remove-text-operation";

export interface WithUndoEditor extends Editor {
  apply: (op:Operation, isUndo?: boolean)=>void;
  undo: ()=>void
  getInverseOp: (op: Operation)=>Operation
}
export function withUndo(editor: Editor): WithUndoEditor{
  const userOpList: Operation[] = [] // 用户操作历史记录
  const actualOpList: Operation[] = [] // 实际历史记录
  let apply = editor.apply.bind(editor) // todo 理清楚为什么要 bind this
  // const withEditor = {...editor} as WithUndoEditor

  // 为 editor 对象新增 undo 相关函数

  // 重写 editor.apply 函数，并且追加一些代码
  editor.apply = (op:Operation, isUndo?: boolean)=>{
    console.log(123);
    apply(op)
    if(op instanceof InsertTextOperation || op instanceof RemoveTextOperation){
      !isUndo && userOpList.push(op) // 如果是回退操作，不会被记录到用户实际操作中
      actualOpList.push(op)
    }
  }
  // 新增 undo 函数
  editor.undo = ()=>{
    const latestOp = userOpList.pop()
    if(latestOp){
      const newOp = editor.getInverseOp(latestOp)
      editor.apply(newOp, true)
    }
  }
  // 新增 undo 函数
  editor.getInverseOp = (operation: Operation)=>{
    let newOp
    if(operation instanceof InsertTextOperation){
      newOp = new RemoveTextOperation(operation.insertIndex, operation.spacers)
    } else if (operation instanceof RemoveTextOperation){
      newOp = new InsertTextOperation(operation.removeIndex, operation.removeSpacers)
    } else {
      throw new Error("op错误")
    }
    return newOp
  }
  return editor as WithUndoEditor
}
