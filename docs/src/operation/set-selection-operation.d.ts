import { Editor } from "../editor";
import Operation from "./operation";
export declare class SetSelectionOperation extends Operation {
    anchorOffset: number;
    focusOffset?: number;
    constructor(anchorOffset: number, focusOffset?: number);
    apply(editor: Editor): void;
}
export default SetSelectionOperation;
