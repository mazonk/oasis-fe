export interface CreateTeamDto {
    name: string;
    description: string | null;
    leaderId: number;
}