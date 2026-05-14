import { ScrollView, Text } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer';

export default function PrivacyScreen() {
  return <ScreenContainer><ScrollView>
    <Text className='text-3xl text-[#123524] font-semibold mt-2'>Privacy Policy</Text>
    <Text className='text-[#6E665A] mt-3'>PrayFirst stores selected local app data and subscription status. Replace this placeholder with your finalized privacy policy, data-retention rules, and contact method before release.</Text>
  </ScrollView></ScreenContainer>;
}
