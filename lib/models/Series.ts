import { Entity } from "./traits/Entity";
import { Nestable } from "./modifiers";
import { Book } from "./Book";
import { RICH_TEXT } from "./aliases";
import { Author } from "./Author";
import { Genre } from "./Genre";

type TODO = any;

type Recommendations = TODO;
type Universe = TODO;

export interface Series extends Entity {
  // primary info
  name?: string;
  tag_line?: string;
  genres?: Nestable<Genre[]>;
  description?: RICH_TEXT;
  authors?: Nestable<Author[]>;
  books?: Nestable<Book[]>;
  universe?: Nestable<Universe>;

  // tertiary info
  recommendations?: Recommendations;
}
