import { KeyboardEventHandler, SelectionchangeEventHandler } from "../event";
import { SelectionModel, TextModel } from "../model";
import SourceCodeView from "../view/source-code-view";
import Operation from "../operation/operation";
export declare class Editor {
    target: HTMLElement;
    eventHandler: KeyboardEventHandler;
    selectionchangeEventHandler: SelectionchangeEventHandler;
    textModel: TextModel;
    selectionModel: SelectionModel;
    view: SourceCodeView;
    constructor(target: HTMLElement);
    init(): void;
    insertTextAtCursor(text: string): void;
    removeTextAtCursor(): void;
    getTextModel(): TextModel;
    apply(op: Operation): void;
    setAttributeToTarget(): void;
    addAddtionalEmptyTextToTarget(): void;
    addAddtionalClassName(): void;
}
export default Editor;
