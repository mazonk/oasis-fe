import { MemberMood } from "./MemberMood";

export interface Mood {
  moodId: number;
  name: string;
  memberMoods?: MemberMood[];
}