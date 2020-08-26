import { Entity } from "./traits/Entity";
import { Nestable } from "./modifiers";
import { Book } from "./Book";
import { RICH_TEXT } from "./aliases";
import { Series } from "./Series";

type TODO = any;

type Recommendations = TODO;

export interface Author extends Entity {
  // hiding because I can't use it
  // avatar?: Image;
  books?: Nestable<Book[]>;
  description?: RICH_TEXT;
  name?: string;
  recommendations?: Recommendations;
  series?: Nestable<Series[]>;
}
