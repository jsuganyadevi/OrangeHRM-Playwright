import fs from "fs";
import path from "path";

export class Logger {

    private static logDirectory = path.join(process.cwd(), "logs");
    private static logFile = path.join(
        Logger.logDirectory,
        "test.log"
    );

    private static timestamp(): string {
        return new Date().toISOString();
    }

    private static write(
        level: string,
        message: string
    ): void {

        const logMessage =
            `[${this.timestamp()}] [${level}] [pid:${process.pid}] ${message}`;

        switch (level) {
            case "WARN":
                console.warn(logMessage);
                break;
            case "ERROR":
                console.error(logMessage);
                break;
            case "DEBUG":
                console.debug(logMessage);
                break;
            default:
                console.log(logMessage);
        }

        try {
            fs.mkdirSync(this.logDirectory, {
                recursive: true
            });

            fs.appendFileSync(this.logFile, `${logMessage}\n`);
        } catch (error) {
            console.error(
                `[${this.timestamp()}] [ERROR] Unable to write to log file "${this.logFile}".`,
                error
            );
        }
    }

    static async operation<T>(
        description: string,
        action: () => Promise<T>
    ): Promise<T> {
        this.info(`Starting: ${description}`);

        try {
            const result = await action();
            this.info(`Completed: ${description}`);
            return result;
        } catch (error) {
            this.error(`Failed: ${description}  | ${error}`);
            throw error;
        }
    }

    static info(message: string): void {
        this.write("INFO", message);
    }

    static warn(message: string): void {
        this.write("WARN", message);
    }

    static error(message: string): void {
        this.write("ERROR", message);
    }

    static debug(message: string): void {
        this.write("DEBUG", message);
    }

}
