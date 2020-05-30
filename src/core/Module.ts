import { injectable } from "inversify";
import { User } from "../metadata/User";
import { AbstractCommand } from "./command/AbstractCommand";
import { ICommandPayload } from "./ICommandPayload";

export interface IModule {
    /**
     * Does the command exist in that module ?
     * @param command Name of the command
     * @return true, if the command exist in that module
     */
    hasCommand(command: string): boolean;

    /**
     * Run the command
     * @param payload
     */
    runCommand(payload: ICommandPayload): void;
}

@injectable()
export class Module implements IModule {
    private readonly commands: AbstractCommand[];

    protected constructor() {
        this.commands = [];
    }

    /**
     * Register a new command into the module
     * @param cmd Command to add
     */
    registerCommand(cmd: AbstractCommand): void {
        this.commands.push(cmd);
    }

    hasCommand(command: string) {
        return this.commands.find((c) => c.getName() === command) !== undefined;
    }

    runCommand(payload: ICommandPayload) {
        const cmd = this.commands.find((c) => c.getName() === payload.command);
        if (cmd) {
            return cmd.run(payload);
        }

        throw new Error(`Unknown command ${payload.command}.`);
    }
}
