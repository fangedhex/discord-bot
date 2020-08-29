import { CommandRunner } from "../../../src/core/command/CommandRunner";
import { anyObject, mock } from "jest-mock-extended";
import { AbstractCommand } from "../../../src/core/command/AbstractCommand";
import { IUser } from "../../../src/core/IUser";
import { UrlType } from "../../../src/core/command/types/UrlType";
import { NumberType } from "../../../src/core/command/types/NumberType";

describe(CommandRunner, () => {
    const command = mock<AbstractCommand>();
    const sender = mock<IUser>();
    const args = ["http://test.com", "0.5"];
    const commandRunner = new CommandRunner(command);

    it("calls our command with transformed arguments", () => {
        command.getDefinition.mockReturnValue([
            {
                name: "url",
                Type: UrlType,
            },
            {
                name: "volume",
                Type: NumberType
            }
        ]);

        commandRunner.runCommand(sender, args);

        expect(command.getDefinition).toHaveBeenCalled();
        expect(command.run).toHaveBeenCalledWith(sender, anyObject({
            url: "http://test.com",
            volume: 0.5
        }));
    });
});