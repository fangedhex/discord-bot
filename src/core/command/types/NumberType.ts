import { AbstractType } from "../AbstractType";

export class NumberType extends AbstractType<number> {
    validate(arg: string): boolean {
        return !isNaN(Number(arg));
    }

    convert(arg: string): number {
        return Number(arg);
    }
}
