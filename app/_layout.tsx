import '../global.css';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initializePurchases } from '@/lib/revenuecat';

export default function Layout() {
  useEffect(() => {
    initializePurchases().catch((e) => console.warn('RevenueCat not ready', e));
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
