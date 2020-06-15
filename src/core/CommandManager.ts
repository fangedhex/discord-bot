import { inject, injectable } from "inversify";
import { EventBus, EventHandler, Listener } from "@fangedhex/eventbus";
import { MessageEvent } from "./events/MessageEvent";
import { AbstractCommand } from "./command/AbstractCommand";
import { CommandRunner } from "./command/CommandRunner";

const COMMAND_PREFIX = "$";

@injectable()
export class CommandManager extends Listener {
    private commands: AbstractCommand[] = [];

    constructor(
        @inject(EventBus) eventBus: EventBus,
        @inject("Factory<CommandRunner>") private commandRunnerFactory: (command: AbstractCommand) => CommandRunner
    ) {
        super();
        eventBus.registerListener(this);
    }

    /**
     * Register a new command
     * @param command
     */
    registerCommand(command: AbstractCommand) {
        this.commands.push(command);
    }

    @EventHandler
    onMessage(ev: MessageEvent) {
        const message = ev.message.getContent();

        // We check if the message start with our command prefix and its length is more than just the prefix
        if (!message.startsWith(COMMAND_PREFIX) || message.length <= 1) return;

        // We split the message to get the arguments
        const args = message.slice(COMMAND_PREFIX.length).split(/ +/);

        // The first argument is our command name so we remove it from the array and store it
        // @ts-ignore
        const cmd = args.shift().toLowerCase();

        const command = this.commands.find((c) => c.getName() === cmd);

        if (command) {
            const commandRunner = this.commandRunnerFactory(command);
            commandRunner.runCommand(ev.sender, args);
        }
    }
}
