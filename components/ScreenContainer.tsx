import { SafeAreaView } from 'react-native-safe-area-context';
export default function ScreenContainer({children}:{children:React.ReactNode}){return <SafeAreaView className='flex-1 bg-[#F8F1E7] px-5'>{children}</SafeAreaView>}
