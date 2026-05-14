import { ScrollView, Text } from 'react-native';
import ScreenContainer from '@/components/ScreenContainer';

export default function TermsScreen() {
  return <ScreenContainer><ScrollView>
    <Text className='text-3xl text-[#123524] font-semibold mt-2'>Terms of Service</Text>
    <Text className='text-[#6E665A] mt-3'>By using PrayFirst you agree to subscription billing terms, auto-renewal, cancellation rules, and acceptable use policies. Replace this placeholder with finalized legal text before release.</Text>
  </ScrollView></ScreenContainer>;
}
