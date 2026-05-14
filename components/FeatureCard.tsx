import { View,Text } from 'react-native';
export default ({title,copy}:{title:string;copy:string})=><View className='bg-[#FFFDF8] border border-[#E8DDCC] rounded-2xl p-4 mb-3'><Text className='text-[#123524] font-semibold'>{title}</Text><Text className='text-[#6E665A] mt-1'>{copy}</Text></View>;
