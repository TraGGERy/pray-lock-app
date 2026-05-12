import { useLocalSearchParams, router } from 'expo-router';
import { Text, View } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer';
import MoodChip from '@/components/MoodChip';
import AppButton from '@/components/AppButton';
import { useState } from 'react';
import { moods } from '@/lib/mockData';
import { storage } from '@/lib/storage';

export default function FocusScreen() {
  const { app = 'Instagram' } = useLocalSearchParams<{ app: string }>();
  const [selectedMood, setSelectedMood] = useState('Distracted');

  const saveMood = async () => {
    const history = await storage.get<string[]>(storage.k.moods, []);
    await storage.set(storage.k.moods, [selectedMood, ...history].slice(0, 150));
    router.push('/tabs/prayers');
  };

  return <ScreenContainer><Text className='text-3xl text-[#123524] font-semibold mt-2'>You’re trying to open {app}</Text>
    <Text className='mt-4 mb-2'>How are you feeling?</Text>
    <View className='flex-row flex-wrap'>{moods.map((m) => <MoodChip key={m} label={m} selected={selectedMood === m} onPress={() => setSelectedMood(m)} />)}</View>
    <View className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4 my-3'>
      <Text>“Lord, I give You my attention right now. Guide my thoughts, quiet the noise, and fill my heart with peace. Amen.”</Text>
    </View>
    <AppButton label='Pray Now' onPress={saveMood} />
    <View className='mt-2'><AppButton label='Unlock After Prayer' variant='secondary' onPress={() => router.push('/tabs/home')} /></View>
  </ScreenContainer>;
}
