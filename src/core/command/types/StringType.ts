import { AbstractType } from "../AbstractType";

/**
 * Basic String check
 */
export class StringType extends AbstractType<string> {
  validate(): boolean {
    return true;
  }

  convert(arg: string): string {
    return arg;
  }

  getErrorMessage(): string {
    return "must be a string";
  }
}
