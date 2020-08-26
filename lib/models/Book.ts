import { RICH_TEXT } from "./aliases";
import { Nestable } from "./modifiers";
import { Entity } from "./traits/Entity";
import { Cover } from "./Cover";
import { Series } from "./Series";
import { Author } from "./Author";
import { BuyLink } from "./BuyLink";
import { Format } from "./Format";
import { Genre } from "./Genre";

type TODO = any;

type Recommendations = TODO;
type Universe = TODO;

export interface Book extends Entity {
  // metadata
  asin?: string;
  isbn_10?: number;
  isbn_13?: number;
  word_count?: number;
  page_count?: number;
  formats?: Nestable<Format[]>;

  // primary info
  cover?: Cover;
  title?: string;
  tag_line?: string;
  authors?: Nestable<Author[]>;
  series?: Nestable<Series>;
  universe?: Nestable<Universe>;
  description?: RICH_TEXT;
  genres?: Nestable<Genre[]>;

  // tertiary info
  buy_links?: Nestable<BuyLink[]>;
  recommendations?: Recommendations;
}
