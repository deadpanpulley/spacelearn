import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { session } = useAuth();
  
  // Redirect to the appropriate screen based on auth status
  return session ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}