export abstract class AbstractType<T> {
  abstract validate(arg: string): boolean;
  abstract getErrorMessage(): string;
  abstract convert(arg: string): T;
}
