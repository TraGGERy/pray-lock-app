import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ScreenContainer';
import AppButton from '@/components/AppButton';
import { storage } from '@/lib/storage';
import { requestNotificationPermissions, scheduleDailyReminder, authenticateBiometric } from '@/lib/device';

export default function ProfileScreen() {
  const [rem, setRem] = useState({ morning: true, evening: false, customTime: '08:30', enabled: true });
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => { (async () => {
    setIsPremium(await storage.get(storage.k.premium, false));
    setRem(await storage.get(storage.k.rem, rem));
  })(); }, []);

  const save = async () => {
    await storage.set(storage.k.rem, rem);
    await requestNotificationPermissions();
    if (rem.enabled) {
      if (rem.morning) await scheduleDailyReminder(rem.customTime, 'Morning prayer', 'Start with God first.');
      if (rem.evening) await scheduleDailyReminder('20:30', 'Evening reflection', 'Close your day in gratitude.');
    }
  };

  return <ScreenContainer><ScrollView>
    <Text className='text-3xl text-[#123524] font-semibold mt-2'>Profile & Settings</Text>
    <Text className='mt-2'>Premium status: {isPremium ? 'Active' : 'Free'}</Text>
    <Pressable onPress={() => router.push('/paywall')}><Text className='text-[#C89B3C] mt-1'>Upgrade / Restore purchase</Text></Pressable>

    <View className='mt-4 bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4'>
      <Text className='font-semibold text-[#123524]'>Reminders</Text>
      <Text>Enable reminders</Text><Switch value={rem.enabled} onValueChange={(v) => setRem({ ...rem, enabled: v })} />
      <Text>Morning prayer reminder</Text><Switch value={rem.morning} onValueChange={(v) => setRem({ ...rem, morning: v })} />
      <Text>Evening reflection reminder</Text><Switch value={rem.evening} onValueChange={(v) => setRem({ ...rem, evening: v })} />
      <Text>Custom reminder time</Text><TextInput value={rem.customTime} onChangeText={(v) => setRem({ ...rem, customTime: v })} className='border border-[#E8DDCC] rounded-xl p-3 bg-[#FFFDF8]' />
    </View>

    <View className='mt-3'><AppButton label='Save Settings' onPress={save} /></View>
    <View className='mt-2'><AppButton label='Biometric Lock Check' variant='secondary' onPress={authenticateBiometric} /></View>
    <View className='mt-2'><AppButton label='Reset local data' variant='secondary' onPress={() => storage.reset()} /></View>
  </ScrollView></ScreenContainer>;
}
