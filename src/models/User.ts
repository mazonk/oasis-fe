import { Member } from "./Member";

export interface User {
  userId: number;
  memberId: number;
  email: string;
  role: string;
  member: Member;
}