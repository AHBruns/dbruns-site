import { Entity } from "./traits/Entity";
import { Nestable } from "./modifiers";
import { Book } from "./Book";

export interface Format extends Entity {
  books?: Nestable<Book[]>;
  name?: string;
}
