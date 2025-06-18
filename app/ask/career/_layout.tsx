
import { Stack } from 'expo-router';

export default function CareerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[entityId]" />
    </Stack>
  );
}
