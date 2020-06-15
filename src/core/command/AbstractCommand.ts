import { AbstractType } from "./AbstractType";
import { IUser } from "../IUser";

const COMMAND_PREFIX = "$";

type TypeCtor = new() => AbstractType<any>;
export interface ArgDef {
    name: string;
    Type: TypeCtor;
}

export abstract class AbstractCommand {
    protected constructor(private _name: string, private args: ArgDef[]) {}

    getName() {
        return this._name;
    }

    getDefinition() {
        return this.args;
    }

    getSyntax(): string {
        const commandWithPrefix = COMMAND_PREFIX + this._name;

        return this.args.reduce<string>((previousValue, currentValue) => {
            return previousValue + ` <${currentValue.name}>`;
        }, commandWithPrefix);
    }

    abstract run(sender: IUser, args?: object): void;
}
