import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import { Readable } from "stream";

export function runCommand(
    input: string,
    command: string,
    args?: string[],
    options?: SpawnOptionsWithoutStdio
): Promise<[number, string]> {
    // https://stackoverflow.com/a/49428486/580201
    return new Promise(function (resolve, reject) {
        const inputStream = new Readable();
        inputStream.push(input);
        inputStream.push(null);

        const proc = spawn(command, args, options);
        proc.on("error", reject);

        inputStream.pipe(proc.stdin);

        const chunks: Buffer[] = [];
        proc.stdout.on("data", (chunk) => chunks.push(chunk));
        proc.stdout.on("error", reject);

        proc.on("exit", (returnCode, signal) => {
            if (returnCode !== null) {
                resolve([returnCode, Buffer.concat(chunks).toString("utf8")]);
            } else {
                reject(new Error(`Program terminated with signal '${signal}`));
            }
        });
    });
}
