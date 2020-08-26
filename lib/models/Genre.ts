import { Entity } from "./traits/Entity";
import { Nestable } from "./modifiers";
import { Book } from "./Book";
import { Series } from "./Series";

type TODO = any;

type Universe = TODO;

export interface Genre extends Entity {
  books?: Nestable<Book[]>;
  name?: string;
  series?: Nestable<Series[]>;
  universes?: Nestable<Universe[]>;
}
