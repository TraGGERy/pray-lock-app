import { View } from 'react-native';
export default ({step,total}:{step:number;total:number})=><View className='flex-row justify-center my-3'>{Array.from({length:total}).map((_,i)=><View key={i} className={`h-2 w-2 rounded-full mx-1 ${i<=step?'bg-[#C89B3C]':'bg-[#E8DDCC]'}`}/>)}</View>;
