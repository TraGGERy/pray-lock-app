import { Pressable,Text } from 'react-native';
export default ({label,selected,onPress}:{label:string;selected:boolean;onPress:()=>void})=><Pressable onPress={onPress} className={`px-3 py-2 rounded-xl border mr-2 mb-2 ${selected?'border-[#1F4D36] bg-[#eef5f1]':'border-[#E8DDCC]'}`}><Text>{label}</Text></Pressable>;
