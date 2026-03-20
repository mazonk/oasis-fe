export interface Team {
  teamId: number;
  name: string;
  description: string | null;
  leaderId: number;
  levelId: number;
  levelName: string | null;
  experience: number;
}