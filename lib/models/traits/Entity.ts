import { ID } from "../aliases";
import { Temporal } from "./Temporal";

export interface Entity extends Temporal {
  id: ID;
}
