
import { Stack } from 'expo-router';

export default function CulturalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[entityId]" />
    </Stack>
  );
}
