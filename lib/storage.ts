import AsyncStorage from '@react-native-async-storage/async-storage';
const k={onboarding:'hasCompletedOnboarding',apps:'selectedBlockedApps',streak:'prayerStreak',mins:'totalPrayerMinutes',completed:'completedPrayers',journal:'journalEntries',moods:'selectedMoodHistory',rem:'reminderSettings',premium:'isPremiumMock'};
const get=async<T>(key:string,f:T)=>JSON.parse((await AsyncStorage.getItem(key))||'null')??f;
const set=async(key:string,v:unknown)=>AsyncStorage.setItem(key,JSON.stringify(v));
export const storage={k,get,set,reset:()=>AsyncStorage.clear()};
