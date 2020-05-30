import { ICommandPayload } from "../ICommandPayload";
import { AbstractType } from "./AbstractType";

export interface ICommand {
    getName: () => string;
    run: (payload: ICommandPayload) => string | void;
}

type Args = (new() => AbstractType<any>)[];

export abstract class AbstractCommand implements ICommand {
    private _description?: string;

    protected constructor(private _name: string, private args: Args) {}

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    setDescription(d: string) {
        this._description = d;
    }

    validate(payload: ICommandPayload) {
        this.args.forEach((T, index) => {
            const t = new T();
            const arg = payload.args[index];

            // TODO Better error
            if (!arg) throw new Error("Missing argument");

            // TODO Better error
            if (!t.validate(arg)) throw new Error("Invalid argument");
        });
    }

    abstract run(payload: ICommandPayload) : string | void;
}
