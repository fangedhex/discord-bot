import { CommandManager } from "../../src/core/CommandManager";
import { EventBus } from "@fangedhex/eventbus";
import { any, anyObject, mock } from "jest-mock-extended";
import { MessageEvent } from "../../src/core/events/MessageEvent";
import { IUser } from "../../src/core/IUser";
import { IMessage } from "../../src/core/IMessage";
import { AbstractCommand } from "../../src/core/command/AbstractCommand";
import { CommandRunner } from "../../src/core/command/CommandRunner";

describe(CommandManager, () => {
    const eventBus = mock<EventBus>();

    const commandRunner = mock<CommandRunner>();
    const commandRunnerFactory = (command: AbstractCommand) => commandRunner;
    const commandManager = new CommandManager(eventBus, commandRunnerFactory);

    expect(eventBus.registerListener).toHaveBeenCalledWith(any(commandManager));

    it("handles command", () => {
        const command = mock<AbstractCommand>({
            getName() {
                return "test";
            },
            getDefinition() {
                return [];
            }
        });
        commandManager.registerCommand(command);

        const sender = mock<IUser>();
        const message = mock<IMessage>({
            getContent() {
                return "$test";
            }
        });
        const messageEvent = new MessageEvent(sender, message);

        commandManager.onMessage(messageEvent);

        expect(commandRunner.runCommand).toHaveBeenCalledWith(sender, []);
    })
});
