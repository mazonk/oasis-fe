import { Member } from "../interfaces/Member";
import { UpdateMemberDto } from "../interfaces/UpdateMemberDto";
import httpClient from "./httpClient";


export const memberService = {
    async getMember(): Promise<Member> {
      const response = await httpClient.get<Member>('/member');
      return response.data;
    },
  
    async getById(id: number): Promise<Member> {
      const response = await httpClient.get<Member>(`/member/${id}`);
      return response.data;
    },
  
    async updateMember(dto: UpdateMemberDto): Promise<void> {
      await httpClient.put('/member', dto);
    },
  };
  