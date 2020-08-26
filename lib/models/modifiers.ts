import { ID } from "./aliases";

export type Nestable<T> = T | (T extends any[] ? ID[] : ID) | undefined;
