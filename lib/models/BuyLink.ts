import { Entity } from "./traits/Entity";
import { Nestable } from "./modifiers";
import { Book } from "./Book";

export interface BuyLink extends Entity {
  book?: Nestable<Book>;
  link?: string;
  platform?: string;
}
