import { ICommandPayload } from "../ICommandPayload";
import { COMMAND_PREFIX } from "../MessageHandler";
import { AbstractType } from "./AbstractType";

export interface ICommand {
    getName: () => string;
    run: (payload: ICommandPayload) => void;
}

type TypeCtor = new() => AbstractType<any>;
interface ArgDef {
    name: string;
    Type: TypeCtor;
}

export abstract class AbstractCommand implements ICommand {
    private _description?: string;

    protected constructor(private _name: string, private args: ArgDef[]) {}

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    setDescription(d: string) {
        this._description = d;
    }

    getSyntax(): string {
        const commandWithPrefix = COMMAND_PREFIX + this._name;

        return this.args.reduce<string>((previousValue, currentValue) => {
            return previousValue + ` <${currentValue.name}>`;
        }, commandWithPrefix);
    }

    validate(payload: ICommandPayload) {
        const errors: string[] = [];

        this.args.forEach((argDef, key) => {
            const t = new argDef.Type();
            const arg = payload.args[key];

            if (arg) {
                if (!t.validate(arg)) errors.push(`${key} ${t.getErrorMessage()}`);
            } else {
                errors.push(`${argDef.name} ${t.getErrorMessage()}`);
            }
        });

        return errors;
    }

    abstract run(payload: ICommandPayload): void;
}
