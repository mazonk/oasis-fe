import { Mood } from "../types";
import { Member } from "./Member";

export interface MemberMood {
  moodId: number;
  mood: Mood;
  memberId: number;
  member: Member;
  cause?: string;
}