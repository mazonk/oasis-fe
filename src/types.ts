export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface TeamInvitation {
  id: string;
  teamName: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Activity {
  id: string;
  title: string;
  category: 'Social' | 'Nature' | 'Distraction' | 'Express Yourself';
  xpReward: number;
  organizerXpBonus: number;
  description: string;
  icon: string;
}

export interface SocialInteraction {
  userId: string;
  userName: string;
  count: number;
  avatar: string;
}
