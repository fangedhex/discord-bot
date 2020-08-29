import { AbstractCommand } from "./AbstractCommand";
import { IUser } from "../IUser";

export class CommandRunner {
  constructor(private command: AbstractCommand) {}

  private transform(args: string[]) {
    const argsDef = this.command.getDefinition();

    // TODO Better way to manage the final type ?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};

    argsDef.forEach((argDef, index) => {
      const arg = args[index];
      const t = new argDef.Type();

      if (!arg) throw new Error("Argument not found.");
      if (!t.validate(arg)) throw new Error("Argument is not correct.");

      result[argDef.name] = t.convert(arg);
    });

    return result;
  }

  runCommand(sender: IUser, args: string[]): void {
    const transformedArgs = this.transform(args);
    this.command.run(sender, transformedArgs);
  }
}
