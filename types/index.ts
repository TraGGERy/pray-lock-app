export type Mood = 'Overwhelmed'|'Anxious'|'Neutral'|'Distracted'|'Peaceful'|'Grateful';
export type JournalEntry = { id: string; text: string; gratitude: string; createdAt: string };
export type ReminderSettings = { morning: boolean; evening: boolean; customTime: string; enabled: boolean };
