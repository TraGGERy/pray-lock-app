import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
import ScreenContainer from '@/components/ScreenContainer';
import OnboardingSlide from '@/components/OnboardingSlide';
import ProgressDots from '@/components/ProgressDots';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';
import { storage } from '@/lib/storage';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<'yearly' | 'monthly'>('yearly');

  const finish = async () => {
    await storage.set(storage.k.onboarding, true);
    router.replace('/blocked-apps');
  };

  const next = async () => {
    if (step < 5) setStep((s) => s + 1);
    else await finish();
  };

  const cta = useMemo(() => {
    if (step === 0) return 'Get Started';
    if (step === 2) return 'See How It Works';
    if (step === 5) return 'Start 7-Day Free Trial';
    return 'Continue';
  }, [step]);

  return (
    <ScreenContainer>
      <ProgressDots step={step} total={6} />
      <ScrollView className='flex-1'>
        {step === 0 && (
          <OnboardingSlide
            title='Put God First, Every Day'
            copy='PrayFirst helps you reduce distractions and build a daily rhythm of prayer that brings peace and purpose.'
          >
            <View className='h-44 rounded-2xl bg-[#FFFDF8] border border-[#E8DDCC]' />
            <Pressable><Text className='text-center mt-3 text-[#6E665A]'>I already have an account</Text></Pressable>
          </OnboardingSlide>
        )}

        {step === 1 && (
          <OnboardingSlide
            title='Distractions Steal Your Peace'
            copy='Social apps, constant noise, overthinking, and screen habits pull your attention away from what matters most—God.'
          >
            <FeatureCard title='Distracted Mind' copy='Constant notifications break your focus.' />
            <FeatureCard title='Broken Prayer Habits' copy='It’s hard to stay consistent when life gets noisy.' />
            <FeatureCard title='Too Much Scrolling' copy='Hours disappear without adding value.' />
            <FeatureCard title='Restless Mornings' copy='You start the day rushed, not centered on God.' />
          </OnboardingSlide>
        )}

        {step === 2 && (
          <OnboardingSlide title='Lock Apps Behind Prayer' copy='Choose the apps that distract you. They only unlock after you pray.'>
            <FeatureCard title='Instagram' copy='Blocked app preview' />
            <FeatureCard title='TikTok' copy='Blocked app preview' />
            <FeatureCard title='YouTube' copy='Blocked app preview' />
            <FeatureCard title='Add More Apps' copy='Add more distracting apps later.' />
            <FeatureCard title='Prayer Before Unlock' copy='Pause and pray before opening selected apps.' />
            <FeatureCard title='Personalized Prayer Prompts' copy='Prompts based on mood and intention.' />
            <FeatureCard title='Scripture Reflection' copy='Reflect before you unlock.' />
          </OnboardingSlide>
        )}

        {step === 3 && (
          <OnboardingSlide title='Build a Lasting Prayer Routine' copy='Small steps create powerful habits that transform your life.'>
            <FeatureCard title='Prayer Streaks' copy='Stay consistent daily.' />
            <FeatureCard title='Mood-Based Prayers' copy='Prayers that meet you where you are.' />
            <FeatureCard title='Focus Insights' copy='Understand attention patterns.' />
            <FeatureCard title='Smart Reminders' copy='Gentle prompts to return to prayer.' />
            <View className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4'>
              <Text className='text-[#123524] italic'>“Be still, and know that I am God.”</Text>
              <Text className='text-[#6E665A] mt-1'>Psalm 46:10</Text>
            </View>
          </OnboardingSlide>
        )}

        {step === 4 && (
          <OnboardingSlide title='See the Transformation' copy='Real people. Real change. Faith that grows.'>
            <FeatureCard title='Sarah M.' copy='“PrayFirst helped me take back my mornings and grow closer to God every single day.” ⭐⭐⭐⭐⭐' />
            <FeatureCard title='Before PrayFirst' copy='• Inconsistent prayer\n• Endless scrolling\n• Rushed mornings' />
            <FeatureCard title='After PrayFirst' copy='• Daily prayer habit\n• More focus and peace\n• Closer to God' />
          </OnboardingSlide>
        )}

        {step === 5 && (
          <OnboardingSlide title='Unlock Your Prayer Routine' copy='Go deeper in faith and build a lasting habit of putting God first.'>
            <FeatureCard title='Unlimited Prayer Access' copy='Premium feature' />
            <FeatureCard title='Advanced Focus Insights' copy='Premium feature' />
            <FeatureCard title='Custom Reminders' copy='Premium feature' />
            <FeatureCard title='Premium Themes' copy='Premium feature' />
            <View className='flex-row gap-3'>
              <PricingCard title='Yearly' price='$29.99 / year' badge='Most Popular • Save 50%' selected={plan === 'yearly'} onPress={() => setPlan('yearly')} />
              <PricingCard title='Monthly' price='$5.99 / month' selected={plan === 'monthly'} onPress={() => setPlan('monthly')} />
            </View>
            <Text className='text-center mt-3 text-[#6E665A]'>Restore Purchase • Terms • Privacy</Text>
            <Pressable onPress={finish}><Text className='text-center mt-2 text-[#6E665A]'>Skip for now</Text></Pressable>
          </OnboardingSlide>
        )}
      </ScrollView>

      <AppButton label={cta} onPress={next} />
    </ScreenContainer>
  );
}
