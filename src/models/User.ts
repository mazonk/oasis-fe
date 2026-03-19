import { Member } from "./Member";

export interface User {
  userId: number;
  memberId: number;
  email: string;
  passwordHash: string | Uint8Array;
  passwordSalt: string | Uint8Array;
  role: string;
  member: Member;
}