export abstract class AbstractType<T> {
    abstract validate(arg: string): boolean;
    abstract convert(arg: string): T;
}
