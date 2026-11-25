import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import Screen from '../../src/components/layout/Screen';
import LoadingState from '../../src/components/ui/LoadingState';
import { useAuth } from '../../src/context/AuthContext';

export default function AppLayout() {
  const router = useRouter();
  const { isConfigured, isAuthenticated, loading } = useAuth();
  const needsAuth = isConfigured && !loading && !isAuthenticated;

  useEffect(() => {
    if (needsAuth) router.replace('/welcome');
  }, [needsAuth, router]);

  if (isConfigured && loading) {
    return (
      <Screen>
        <LoadingState label="Restoring your session…" />
      </Screen>
    );
  }

  if (needsAuth) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      <Stack.Screen
        name="result/[id]"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}
