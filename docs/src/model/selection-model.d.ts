import { Editor } from "../editor";
export declare class SelectionModel {
    editor: Editor;
    anchorOffset: number;
    focusOffset: number;
    constructor(editor: Editor);
    getSelection(): {
        anchorOffset: number;
        focusOffset: number;
        isMultipleSelect: boolean;
    };
    setSelection(anchorOffset: number, focusOffset?: number): void;
    isMultipleSelect(): boolean;
    isSelectionAtLast(): boolean;
}
export default SelectionModel;
