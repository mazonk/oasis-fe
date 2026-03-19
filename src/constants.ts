import { Mood, Activity, SocialInteraction, TeamInvitation } from './types';

export const MOODS: Mood[] = [
  { id: 'excited', label: 'Excited', emoji: '😊', color: 'bg-pink-400' },
  { id: 'joyful', label: 'Joyful', emoji: '🥰', color: 'bg-rose-400' },
  { id: 'grateful', label: 'Grateful', emoji: '😌', color: 'bg-purple-400' },
  { id: 'energized', label: 'Energized', emoji: '⚡', color: 'bg-indigo-400' },
  { id: 'sensitive', label: 'Sensitive', emoji: '🥺', color: 'bg-blue-400' },
  { id: 'confused', label: 'Confused', emoji: '🧐', color: 'bg-blue-600' },
  { id: 'bored', label: 'Bored', emoji: '😑', color: 'bg-green-500' },
  { id: 'stressed', label: 'Stressed', emoji: '😫', color: 'bg-emerald-600' },
  { id: 'angry', label: 'Angry', emoji: '😡', color: 'bg-orange-600' },
  { id: 'insecure', label: 'Insecure', emoji: '😟', color: 'bg-orange-400' },
  { id: 'hurt', label: 'Hurt', emoji: '🩹', color: 'bg-amber-500' },
  { id: 'guilty', label: 'Guilty', emoji: '😔', color: 'bg-yellow-400' },
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Team Coffee Break',
    category: 'Social',
    xpReward: 50,
    organizerXpBonus: 20,
    description: 'A quick 15-min chat with the team.',
    icon: 'Coffee',
  },
  {
    id: '2',
    title: 'Park Walk',
    category: 'Nature',
    xpReward: 100,
    organizerXpBonus: 40,
    description: 'Walk together in the nearest park.',
    icon: 'Trees',
  },
  {
    id: '3',
    title: 'Quick Gaming Session',
    category: 'Distraction',
    xpReward: 30,
    organizerXpBonus: 10,
    description: 'Play a quick round of a casual game.',
    icon: 'Gamepad2',
  },
  {
    id: '4',
    title: 'Creative Jam',
    category: 'Express Yourself',
    xpReward: 80,
    organizerXpBonus: 30,
    description: 'Share something creative you worked on.',
    icon: 'Palette',
  },
];

export const SOCIAL_INTERACTIONS: SocialInteraction[] = [
  { userId: '2', userName: 'Alex Chen', count: 42, avatar: 'https://picsum.photos/seed/alex/100' },
  { userId: '3', userName: 'Sarah Miller', count: 28, avatar: 'https://picsum.photos/seed/sarah/100' },
  { userId: '4', userName: 'Jordan Lee', count: 15, avatar: 'https://picsum.photos/seed/jordan/100' },
];

export const PENDING_INVITATIONS: TeamInvitation[] = [
  { id: 'inv1', teamName: 'Design Wizards', invitedBy: 'Sarah Miller', status: 'pending' },
  { id: 'inv2', teamName: 'Frontend Blobs', invitedBy: 'Alex Chen', status: 'pending' },
];
