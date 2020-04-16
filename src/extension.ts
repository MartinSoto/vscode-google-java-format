import {
    ExtensionContext,
    languages,
    Range,
    TextDocument,
    TextEdit,
} from "vscode";
import { runCommand } from "./subproc";

export function activate(context: ExtensionContext) {
    console.log('Activating extension "google-java-format"');

    function fullDocumentRange(document: TextDocument): Range {
        const lastLineId = document.lineCount - 1;
        return new Range(
            0,
            0,
            lastLineId,
            document.lineAt(lastLineId).text.length
        );
    }

    languages.registerDocumentFormattingEditProvider("java", {
        async provideDocumentFormattingEdits(
            document: TextDocument
        ): Promise<TextEdit[]> {
            const documentText = document.getText();
            const formattedText = await runCommand(documentText, "java", [
                "-jar",
                "/Users/msoto/Desktop/Projects/vscode-google-java-format/google-java-format-1.7-all-deps.jar",
                "--aosp",
                "-",
            ]);

            return [
                TextEdit.replace(fullDocumentRange(document), formattedText),
            ];
        },
    });
}

export function deactivate() {}
