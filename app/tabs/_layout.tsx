import { Tabs } from 'expo-router';
import { BarChart3, Flame, Hand, House, User } from 'lucide-react-native';

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#C89B3C', tabBarInactiveTintColor: '#6E665A', tabBarStyle: { backgroundColor: '#FFFDF8' } }}>
    <Tabs.Screen name='home' options={{ title: 'Home', tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }} />
    <Tabs.Screen name='prayers' options={{ title: 'Prayers', tabBarIcon: ({ color, size }) => <Hand color={color} size={size} /> }} />
    <Tabs.Screen name='focus' options={{ title: 'Focus', tabBarIcon: ({ color, size }) => <Flame color={color} size={size} /> }} />
    <Tabs.Screen name='insights' options={{ title: 'Insights', tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} /> }} />
    <Tabs.Screen name='profile' options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
  </Tabs>;
}
