import { AbstractCommand } from "../core/command/AbstractCommand";
import { CommandRunner } from "../core/command/CommandRunner";

export class CommandRunnerFactory {
  create(command: AbstractCommand): CommandRunner {
    return new CommandRunner(command);
  }
}
