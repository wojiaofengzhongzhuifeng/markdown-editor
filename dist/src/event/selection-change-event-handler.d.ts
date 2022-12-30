import { Editor } from "../editor";
export declare class SelectionchangeEventHandler {
    editor: Editor;
    wantToMultipleChoice: boolean;
    anchorOffset: number;
    focusOffset: number;
    constructor(editor: Editor);
    _selectionchangeHandler(e: any): void;
    _mouseDownHandler(e: MouseEvent): void;
    _mouseUpHandler(e: MouseEvent): void;
    init(): void;
}
export default SelectionchangeEventHandler;
