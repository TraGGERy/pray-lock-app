import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { storage } from '@/lib/storage';
import ScreenContainer from '@/components/ScreenContainer';
export default function Splash(){useEffect(()=>{setTimeout(async()=>{const done=await storage.get(storage.k.onboarding,false);router.replace(done?'/tabs/home':'/onboarding');},900)},[]);return <ScreenContainer><View className='flex-1 items-center justify-center'><Text className='text-5xl text-[#123524] font-semibold'>PrayFirst</Text><Text className='text-[#6E665A] mt-2'>Faith first. Everything else second.</Text></View></ScreenContainer>}
