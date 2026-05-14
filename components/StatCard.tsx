import { View,Text } from 'react-native';
export default ({label,value}:{label:string;value:string|number})=><View className='bg-[#FFFDF8] rounded-2xl border border-[#E8DDCC] p-4 flex-1'><Text className='text-[#6E665A]'>{label}</Text><Text className='text-2xl text-[#123524] font-bold mt-1'>{value}</Text></View>;
