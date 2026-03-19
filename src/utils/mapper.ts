import { MemberMood } from "../interfaces/MemberMood";
import { Activity } from "../interfaces/Activity";
import { Level } from "../interfaces/Level";
import { ActivityCategory } from "../interfaces/ActivityCategory";
import { Member } from "../interfaces/Member";
import { Team } from "../interfaces/Team";
import { User } from "../interfaces/User";

export function mapToActivity(data: any): Activity {
    return {
        activityId: data.ActivityId,
        title: data.Title,
        description: data.Description,
        minMember: data.MinMember,
        maxMember: data.MaxMember,
        categoryId: data.Category,
        activityCategory: mapToActivityCategory(data.Category), 
    };
}

export function mapToLevel(data: any): Level {
  return {
    levelId: data.LevelId,
    name: data.Name,
    minExp: data.MinExp,
    teams: mapToTeam(data.Team),
    members: mapToMember(data.Member),
  };
}

export function mapToActivityCategory(data: any): ActivityCategory {
    return {
        categoryId: data.CategoryId,
        name: data.Name,
        activities: data.Activities,
    };
}

export function mapToMember(data: any): Member {
    return {
        memberId: data.MemberId,
        fname: data.Fname,
        lname: data.Lname,
        email: data.Email,
        phone: data.Phone,
        dob: data.Dob,
        levelId: data.LevelId,
        level: mapToLevel(data.Level),
        teamId: data.TeamId,
        team: mapToTeam(data.Team),
        memberMoods: data.MemberMoods
          ? data.MemberMoods.map((m: any) => mapToMemberMood(m))
          : [],
        user: mapToUser(data.User),
    };
}

export function mapToMemberMood(data: any): MemberMood {
  return {
    moodId: data.MoodId,
    memberId: data.MemberId,
    mood: data.Mood,
    member: data.Member,
    cause: data.Cause,
  };
}

export function mapToTeam(data: any): Team {
    return {
    teamId: data.TeamId ?? data.teamId,
    name: data.Name ?? data.name,
    description: data.Description ?? data.description,
    leaderId: data.LeaderId ?? data.leaderId,
    leader: data.Leader ? mapToMember(data.Leader) : undefined,
    levelId: data.LevelId ?? data.levelId,
    level: data.Level ? mapToLevel(data.Level) : undefined,
    members: data.Members 
      ? data.Members.map((m: any) => mapToMember(m)) 
      : (data.members ?? [])
  };
}

export function mapToUser(data: any): User {
    return {
        userId: data.UserId,
        memberId: data.MemberId,
        email: data.Email,
        role: data.Role,
        member: mapToMember(data.member),
    };
}