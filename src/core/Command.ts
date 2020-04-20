import { User } from "../metadata/User";
import { ICommandPayload } from "./ICommandPayload";

// type CommandCallback = (user: User, args: string[]) => string | void;

export interface ICommand {
    getName: () => string;
    run: (payload: ICommandPayload) => string | void;
}

export class Command implements ICommand {
    private _description?: string;

    constructor(private _name: string) {}

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    setDescription(d: string) {
        this._description = d;
    }

    run(payload: ICommandPayload) : string | void {
        throw new Error('This method is abstract');
    };
}
