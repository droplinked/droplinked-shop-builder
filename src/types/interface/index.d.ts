export interface IUpdateStates<T> {
    key: keyof T;
    value: T[keyof T];
}
