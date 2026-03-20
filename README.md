# Oasis Frontend

Vue 3 web app for the Oasis team wellness platform.

## Tech Stack

- **Framework**: Vue 3 (Composition API + `<script setup>`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Pinia
- **HTTP**: Axios
- **Animations**: GSAP + Motion One (`@motionone/vue`)
- **Icons**: Lucide Vue Next
- **Font**: Quicksand (Google Fonts)

## Getting Started

### Prerequisites

- Node.js v18+

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure the API base URL in `src/services/httpClient.ts`:
   ```ts
   const instance = axios.create({
     baseURL: 'https://localhost:5001/api',
   });
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

---

## Project Structure

```
src/
├── components/           # Shared UI components (Navbar, Mascot, MoodPopup...)
├── views/ or pages/      # Page-level components (Home, Team, Activities...)
├── stores/               # Pinia stores
│   ├── AuthStore.ts
│   ├── MemberStore.ts
│   ├── TeamStore.ts
│   ├── InvitationStore.ts
│   ├── LevelStore.ts
│   └── activityStore.ts
├── services/             # API service layer
│   ├── httpClient.ts
│   ├── memberService.ts
│   ├── teamService.ts
│   ├── invitationService.ts
│   ├── levelService.ts
│   └── activityService.ts
├── interfaces/           # TypeScript interfaces
├── types.ts              # Shared types
├── constants.ts          # Moods, mock data
└── utils/
    ├── utils.ts          # cn() helper
    └── mapper.ts         # API response mappers
```

---

## Stores

| Store | State | Key Actions |
|-------|-------|-------------|
| `AuthStore` | `loggedInMember` | `login`, `logout` |
| `MemberStore` | `member`, `isLoading` | `fetchMe`, `updateMe` |
| `TeamStore` | `team`, `allTeams`, `isLoading` | `fetchMyTeam`, `createTeam` |
| `InvitationStore` | `invitations`, `isLoading` | `fetchMyInvitations`, `inviteMember`, `respondToInvitation` |
| `LevelStore` | `levels`, `isLoading` | `fetchLevels` |
| `activityStore` | `activities`, `suggestedActivity`, `isSuggesting` | `fetchActivities`, `suggestActivity`, `clearSuggestion` |

---

## Key Features

### Authentication
- JWT stored in `sessionStorage`
- `memberId` and `email` stored in `sessionStorage` after login
- `httpClient` automatically attaches the token to every request

### Team Hub
- View your team (name, level, XP, mood)
- Create a new team — you become the leader automatically
- Invite members by email
- Accept or decline incoming invitations

### Activities
- Browse all available activities with XP rewards
- **AI Suggest** — asks Gemini for a tailored activity based on location, live weather, time of day, season, and team size
- Complete activities to earn XP for yourself and your team

### XP & Levels
- Members and teams each have an `experience` value
- Completing activities awards XP to both
- Level up automatically when XP thresholds are crossed
- Click your name in the navbar to view all levels and see where you stand

### Mood
- Click the mascot logo to open the mood popup
- Moods are displayed on team cards

---

## Theming

Custom Tailwind theme defined in `src/style.css`:

```css
@theme {
  --font-quicksand: "Quicksand", sans-serif;
  --color-oasis-lime: #B6CF33;
  --color-oasis-moss: #6B8834;
  --color-oasis-sky: #559ED2;
  --color-oasis-navy: #0B395A;
  --color-oasis-purple: #6D597A;
  --color-oasis-bg: #F8FAF5;
}
```

Use these as Tailwind utilities anywhere: `text-oasis-navy`, `bg-oasis-lime`, `font-quicksand` etc.

---

## Notes

- Session storage is used for `memberId` and `email` — these are cleared on tab close
- The `LevelStore` caches levels in memory and won't re-fetch if already loaded
- `InvitationStore` automatically calls `teamStore.fetchMyTeam()` after accepting an invitation
- GSAP animations target CSS class names — avoid renaming classes like `team-header`, `invitation-item`, `sidebar-card` as they are animation targets
