import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Chrome as Home, User, BookOpen, Brain } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0B3D91',
        tabBarInactiveTintColor: '#71717A',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          borderTopWidth: 1,
          borderTopColor: '#F0F0F5',
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          fontSize: 18,
          color: '#0B3D91',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          headerTitle: 'SpaceLearn',
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
          headerTitle: 'Space Courses',
        }}
      />
      <Tabs.Screen
        name="ai-help"
        options={{
          title: 'AI Help',
          tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
          headerTitle: 'AI Learning Assistant',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          headerTitle: 'Your Profile',
        }}
      />
    </Tabs>
  );
}