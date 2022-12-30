import { Editor } from "../editor";
export declare class TextModel {
    editor: Editor;
    _spacers: string;
    constructor(editor: Editor);
    insert(index: number, spacers: string): void;
    remove(removeStartIndex: number, removeEndIndex?: number): string;
    getAllSpacers(): string;
}
export default TextModel;
