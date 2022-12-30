import { Editor } from "../editor";
export declare class KeyboardEventHandler {
    target: HTMLElement;
    editor: Editor;
    isComposition: boolean;
    timeId: any;
    constructor(editor: Editor);
    private _beforeInputHandler;
    private compositionstartHandler;
    private compositionendHandler;
    addEventListener(): void;
}
export default KeyboardEventHandler;
