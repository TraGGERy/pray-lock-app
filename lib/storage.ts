import AsyncStorage from '@react-native-async-storage/async-storage';

const k = {
  onboarding: 'hasCompletedOnboarding',
  apps: 'selectedBlockedApps',
  streak: 'prayerStreak',
  bestStreak: 'bestPrayerStreak',
  mins: 'totalPrayerMinutes',
  completed: 'completedPrayers',
  journal: 'journalEntries',
  moods: 'selectedMoodHistory',
  rem: 'reminderSettings',
  premium: 'isPremiumMock',
};

const get = async <T,>(key: string, fallback: T): Promise<T> => {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};
const set = async (key: string, value: unknown) => AsyncStorage.setItem(key, JSON.stringify(value));

export const storage = { k, get, set, reset: () => AsyncStorage.clear() };
