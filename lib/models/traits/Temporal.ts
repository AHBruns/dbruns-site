import { DATE_TIME_STRING, ID } from "../aliases";
import { Nestable } from "../modifiers";

type TODO = any;

type User = TODO;

export interface Temporal {
  created_at: DATE_TIME_STRING;
  updated_at: DATE_TIME_STRING;
  created_by: Nestable<User>;
  updated_by: Nestable<User>;
}
