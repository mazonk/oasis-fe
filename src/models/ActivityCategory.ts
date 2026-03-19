import { Activity } from "../types";

export interface ActivityCategory {
  categoryId: number;
  name: string;
  activities?: Activity[];
}