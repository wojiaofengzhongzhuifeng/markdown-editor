import Operation from "./operation";
import { Editor } from "../editor";
export declare class RemoveTextOperation extends Operation {
    removeStartIndex: number;
    removeSpacers: string;
    removeEndIndex: number;
    constructor(obj: {
        removeStartIndex: number;
        removeEndIndex?: number;
        removeSpacers?: string;
    });
    apply(editor: Editor): void;
}
export default RemoveTextOperation;
