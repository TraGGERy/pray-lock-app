import { Text, View } from 'react-native';
export default function OnboardingSlide({title,copy,children}:{title:string;copy:string;children?:React.ReactNode}){return <View className='flex-1'><Text className='text-4xl text-[#123524] font-semibold mt-3'>{title}</Text><Text className='text-[#6E665A] mt-3 mb-4 text-base'>{copy}</Text>{children}</View>}
