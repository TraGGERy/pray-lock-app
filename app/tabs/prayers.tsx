import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer';
import AppButton from '@/components/AppButton';
import { storage } from '@/lib/storage';
import { JournalEntry } from '@/types';

export default function PrayersScreen() {
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [entry, setEntry] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [items, setItems] = useState<JournalEntry[]>([]);

  useEffect(() => { (async () => setItems(await storage.get(storage.k.journal, [] as JournalEntry[])))(); }, []);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const saveReflection = async () => {
    const next = [{ id: `${Date.now()}`, text: entry, gratitude, createdAt: new Date().toISOString() }, ...items];
    setItems(next); setEntry(''); setGratitude('');
    await storage.set(storage.k.journal, next);
  };

  const endPrayer = async () => {
    const done = await storage.get(storage.k.completed, 0);
    const mins = await storage.get(storage.k.mins, 0);
    const streak = await storage.get(storage.k.streak, 0);
    const best = await storage.get(storage.k.bestStreak, 0);
    await storage.set(storage.k.completed, done + 1);
    await storage.set(storage.k.mins, mins + 5);
    await storage.set(storage.k.streak, streak + 1);
    await storage.set(storage.k.bestStreak, Math.max(best, streak + 1));
  };

  return <ScreenContainer><ScrollView>
    <Text className='text-4xl text-[#123524] font-semibold mt-2'>Guided Prayer</Text>
    <Text className='text-6xl my-7 text-center text-[#1F4D36]'>{Math.floor(seconds / 60)}:{`${seconds % 60}`.padStart(2, '0')}</Text>
    <AppButton label={running ? 'Pause' : 'Start'} onPress={() => setRunning(!running)} />
    <Text className='my-3 text-[#6E665A]'>Prayer prompt: Ask for focus and peace before unlocking distractions.</Text>
    <AppButton label='End Prayer & Unlock' onPress={endPrayer} />

    <Text className='text-2xl text-[#123524] font-semibold mt-8'>Journal & Gratitude</Text>
    <Text className='text-[#6E665A] mt-1'>What is on your heart today?</Text>
    <TextInput value={entry} onChangeText={setEntry} multiline className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4 min-h-24 mt-2' />
    <Text className='text-[#6E665A] mt-2'>Gratitude</Text>
    <TextInput value={gratitude} onChangeText={setGratitude} className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4 mt-1' />
    <View className='mt-2'><AppButton label='Save Reflection' onPress={saveReflection} /></View>
    {items.map((i) => <View key={i.id} className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4 mt-3'>
      <Text>{i.text}</Text><Text className='text-[#6E665A] mt-1'>Grateful for: {i.gratitude}</Text>
    </View>)}
  </ScrollView></ScreenContainer>;
}
