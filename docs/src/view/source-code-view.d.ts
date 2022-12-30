import { SelectionModel, TextModel } from "../model";
import { Editor } from "../editor";
export declare class SourceCodeView {
    textModel: TextModel;
    selctionModel: SelectionModel;
    target: HTMLElement;
    constructor(editor: Editor);
    render(): void;
    renderSelection(node: Node, anchorOffset: number, focusOffset?: number): void;
}
export default SourceCodeView;
