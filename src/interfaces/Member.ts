export interface Member {
  memberId: number;
  fname: string;
  lname: string;
  email: string;
  phone: string | null;
  dob: string | null;
  teamName: string | null;
  experience: number | null;
  levelId: number | null;
  levelName: string | null;
}