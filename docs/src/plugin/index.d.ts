import { Editor } from "../editor";
import Operation from "../operation/operation";
export interface WithUndoEditor extends Editor {
    apply: (op: Operation, isUndo?: boolean) => void;
    undo: () => void;
    getInverseOp: (op: Operation) => Operation;
}
export declare function withUndo(editor: Editor): WithUndoEditor;
