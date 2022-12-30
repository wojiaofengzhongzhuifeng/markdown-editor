import SourceCodeView from "./source-code-view";
import { Editor } from "../editor";
export default class SourceCodeAndPreview extends SourceCodeView {
    constructor(editor: Editor);
    render(): void;
}
