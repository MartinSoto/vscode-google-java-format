import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating extension "google-java-format"');

    vscode.languages.registerDocumentFormattingEditProvider("foo-lang", {
        provideDocumentFormattingEdits(
            document: vscode.TextDocument
        ): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (firstLine.text !== "42") {
                return [vscode.TextEdit.insert(firstLine.range.start, "42\n")];
            }

            return [];
        },
    });
}

// this method is called when your extension is deactivated
export function deactivate() {}
