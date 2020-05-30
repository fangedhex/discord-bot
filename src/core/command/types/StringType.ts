import { AbstractType } from "../AbstractType";

/**
 * Basic String check
 */
export class StringType extends AbstractType<string> {
    validate(arg: string): boolean {
        return true;
    }

    convert(arg: string): string {
        return arg;
    }
}
