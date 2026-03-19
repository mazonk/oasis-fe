import { Level } from "./Level";
import { Member } from "./Member";

export interface Team {
  teamId: number;
  name: string;
  description?: string;
  leaderId?: number;
  leader?: Member;
  levelId?: number;
  level?: Level;
  members?: Member[];
}