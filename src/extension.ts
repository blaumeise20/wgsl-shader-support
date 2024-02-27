import * as path from "path";
import { workspace, ExtensionContext } from "vscode";
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const serverFile = context.asAbsolutePath(path.join("server/target/debug/server")); // TODO: correct path

    const serverOptions: ServerOptions = {
        run: { command: serverFile, transport: TransportKind.stdio },
        debug: { command: serverFile, transport: TransportKind.stdio },
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { scheme: "file", language: "wgsl" },
            { scheme: "file", pattern: "*.wgsl" },
        ],
        // synchronize: {
        //    fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
        // }
    };

    client = new LanguageClient(
        "languageServerExample",
        "Language Server Example",
        serverOptions,
        clientOptions
    );

    // TODO: enable
    // client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    // return client.stop();
}
