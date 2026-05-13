import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ScreenContainer';
import PricingCard from '@/components/PricingCard';
import AppButton from '@/components/AppButton';
import {
  findPackageById,
  getCustomerInfo,
  getOfferings,
  hasProEntitlement,
  presentPaywall,
  purchasePackage,
  restorePurchases,
} from '@/lib/revenuecat';
import { storage } from '@/lib/storage';
import type { PurchasesOffering } from 'react-native-purchases';

export default function PaywallScreen() {
  const [selected, setSelected] = useState<'yearly' | 'monthly' | 'lifetime'>('yearly');
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setOffering(await getOfferings());
        const info = await getCustomerInfo();
        if (hasProEntitlement(info)) {
          await storage.set(storage.k.premium, true);
          router.back();
        }
      } catch (e) {
        Alert.alert('Billing setup issue', 'Subscription service is not configured yet.');
      }
    })();
  }, []);

  const buySelected = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const pkg = findPackageById(offering, selected);
      if (!pkg) {
        const ok = await presentPaywall();
        if (ok) {
          await storage.set(storage.k.premium, true);
          router.back();
        }
        return;
      }
      const info = await purchasePackage(pkg);
      if (hasProEntitlement(info)) {
        await storage.set(storage.k.premium, true);
        Alert.alert('Success', 'Premium unlocked.');
        router.back();
      }
    } catch {
      Alert.alert('Purchase failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRestore = async () => {
    try {
      const info = await restorePurchases();
      const active = hasProEntitlement(info);
      await storage.set(storage.k.premium, active);
      Alert.alert(active ? 'Restored' : 'No active purchases found');
    } catch {
      Alert.alert('Restore failed');
    }
  };

  return (
    <ScreenContainer>
      <Pressable onPress={() => router.back()}><Text>Close</Text></Pressable>
      <Text className='text-4xl text-[#123524] font-semibold mt-4'>Unlock Your Prayer Routine</Text>
      <Text className='text-[#6E665A] my-3'>Choose your plan</Text>
      <View className='flex-row gap-3'>
        <PricingCard title='Lifetime' price='One-time' selected={selected === 'lifetime'} onPress={() => setSelected('lifetime')} />
        <PricingCard title='Yearly' price='$29.99 / year' badge='Most Popular' selected={selected === 'yearly'} onPress={() => setSelected('yearly')} />
      </View>
      <View className='mt-3'>
        <PricingCard title='Monthly' price='$5.99 / month' selected={selected === 'monthly'} onPress={() => setSelected('monthly')} />
      </View>
      <View className='mt-4'><AppButton label={loading ? 'Processing...' : 'Continue'} onPress={buySelected} /></View>
      <Pressable onPress={onRestore}><Text className='text-center mt-3 text-[#6E665A]'>Restore Purchase</Text></Pressable>
      <Text className='text-center mt-2 text-[#6E665A]'>Terms • Privacy</Text>
    </ScreenContainer>
  );
}
