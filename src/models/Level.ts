import { Member } from "./Member";
import { Team } from "./Team";

export interface Level {
  levelId: number;
  name?: string;
  minExp: number;
  teams?: Team[];
  members?: Member[];
}