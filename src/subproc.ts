import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import { Readable } from "stream";

export function runCommand(
    input: string,
    command: string,
    args?: string[],
    options?: SpawnOptionsWithoutStdio
): Promise<string> {
    return new Promise(function (resolve, reject) {
        const inputStream = new Readable();
        inputStream.push(input);
        inputStream.push(null);

        const proc = spawn(command, args, options);
        inputStream.pipe(proc.stdin);

        const chunks: Buffer[] = [];
        proc.stdout.on("data", (chunk) => chunks.push(chunk));
        proc.stdout.on("error", reject);
        proc.stdout.on("end", () =>
            resolve(Buffer.concat(chunks).toString("utf8"))
        );
    });
}
