import Operation from "./operation";
import { Editor } from "../editor";
export declare class InsertTextOperation extends Operation {
    spacers: string;
    insertIndex: number;
    constructor(index: number, spacers: string);
    apply(editor: Editor): void;
}
export default InsertTextOperation;
