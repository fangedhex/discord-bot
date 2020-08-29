import { AbstractType } from "./AbstractType";
import { IUser } from "../IUser";

const COMMAND_PREFIX = "$";

// TODO Replace any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeCtor = new () => AbstractType<any>;
export interface ArgDef {
  name: string;
  Type: TypeCtor;
}

export abstract class AbstractCommand {
  protected constructor(private _name: string, private args: ArgDef[]) {}

  getName(): string {
    return this._name;
  }

  getDefinition(): ArgDef[] {
    return this.args;
  }

  getSyntax(): string {
    const commandWithPrefix = COMMAND_PREFIX + this._name;

    return this.args.reduce<string>((previousValue, currentValue) => {
      return previousValue + ` <${currentValue.name}>`;
    }, commandWithPrefix);
  }

  abstract run(sender: IUser, args?: Record<string, unknown>): void;
}
