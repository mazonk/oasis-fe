import type { Level } from './Level';
import type { Team } from './Team';
import type { MemberMood } from './MemberMood';
import type { User } from './User';
export interface Member {
  memberId: number;
  fname: string;
  lname: string;
  email: string;
  phone?: string;
  dob?: Date | string;

  levelId?: number;
  level?: Level;

  teamId?: number;
  team?: Team;

  memberMoods?: MemberMood[];
  user?: User;
}
export const getMemberDisplayName = (member: Member): string => {
  return member.fname;
};