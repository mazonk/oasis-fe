import { ActivityCategory } from "./ActivityCategory";
export interface Activity {
  activityId: number;
  title: string;
  description?: string;
  minMember?: number;
  maxMember?: number;
  experience?: number;
  categoryId?: number;
  category?: ActivityCategory;
}
