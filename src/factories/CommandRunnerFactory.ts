import { AbstractCommand } from "../core/command/AbstractCommand";
import { CommandRunner } from "../core/command/CommandRunner";

export class CommandRunnerFactory {
    create(command: AbstractCommand) {
        return new CommandRunner(command);
    }
}
