
import { Stack } from 'expo-router';

export default function LegalSupportLayout() {
  return (
   <Stack>
     <Stack.Screen name="index" options={{ headerShown: false }} />
     <Stack.Screen name="[courseId]" options={{ headerShown: false }} />
   </Stack>
  );
}

