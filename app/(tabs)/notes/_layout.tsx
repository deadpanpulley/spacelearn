import { Stack } from 'expo-router';

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Notes',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: 'View Note',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="edit" 
        options={{ 
          title: 'Edit Note',
          headerShown: true,
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}