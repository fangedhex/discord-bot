import { injectable } from "inversify";
import { AbstractCommand } from "./command/AbstractCommand";
import { ICommandPayload } from "./ICommandPayload";

@injectable()
export abstract class Module {
    private readonly commands: AbstractCommand[];

    protected constructor() {
        this.commands = [];
    }

    /**
     * Called when enabling this module
     */
    abstract onEnable(): void;

    /**
     * Called when disabling this module
     */
    abstract onDisable(): void;

    /**
     * Register a new command into the module
     * @param cmd Command to add
     */
    registerCommand(cmd: AbstractCommand): void {
        this.commands.push(cmd);
    }

    getRegisteredCommands(): AbstractCommand[] {
        return this.commands;
    }

    /*hasCommand(command: string) {
        return this.commands.find((c) => c.getName() === command) !== undefined;
    }

    runCommand(payload: ICommandPayload) {
        const cmd = this.commands.find((c) => c.getName() === payload.command);

        if (cmd) {
            const errors = cmd.validate(payload);

            if (errors.length === 0) {
                cmd.run(payload);
            } else {
                payload.chat.send(cmd.getSyntax());
                errors.forEach((error) => payload.chat.send(error));
            }
        } else {
            payload.chat.send(`Unknown command ${payload.command}`);
        }
    }*/
}
