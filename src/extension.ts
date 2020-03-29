import {
    ExtensionContext,
    TextDocument,
    Range,
    TextEdit,
    languages,
} from "vscode";

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

    languages.registerDocumentFormattingEditProvider("foo-lang", {
        async provideDocumentFormattingEdits(
            document: TextDocument
        ): Promise<TextEdit[]> {
            return [
                TextEdit.replace(
                    fullDocumentRange(document),
                    "Yeah!\n" +
                        document
                            .getText()
                            .replace("xx", "\nlots\nof\nlines\n") +
                        "\nYass!"
                ),
            ];
        },
    });
}

export function deactivate() {}
