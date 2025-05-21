// app/_layout.tsx
import { LanguageProvider } from '../contexts/LanguageContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="learn" options={{ headerShown: false }} />
        <Stack.Screen name="ask" options={{ headerShown: false }} />
        <Stack.Screen name="community" options={{ headerShown: false }} />
        <Stack.Screen name="information" options={{ headerShown: false }} />
        <Stack.Screen name="community/map" options={{ headerShown: false }} />
        <Stack.Screen name="community/can-help" options={{ headerShown: false }} />
        <Stack.Screen name="community/need-help" options={{ headerShown: false }} />
        <Stack.Screen name="information/ask-me" options={{ headerShown: false }} />
        <Stack.Screen name="information/contacts" options={{ headerShown: false }} />
        <Stack.Screen name="information/culture" options={{ headerShown: false }} />
        <Stack.Screen name="information/education" options={{ headerShown: false }} />
        <Stack.Screen name="information/finance" options={{ headerShown: false }} />
        <Stack.Screen name="information/funding" options={{ headerShown: false }} />
        <Stack.Screen name="information/german-learning" options={{ headerShown: false }} />
        <Stack.Screen name="information/health" options={{ headerShown: false }} />
        <Stack.Screen name="information/housing" options={{ headerShown: false }} />
        <Stack.Screen name="information/mobility" options={{ headerShown: false }} />
        <Stack.Screen name="information/political-education" options={{ headerShown: false }} />
        <Stack.Screen name="information/translation" options={{ headerShown: false }} />
        <Stack.Screen name="information/volunteering" options={{ headerShown: false }} />
        <Stack.Screen name="information/work" options={{ headerShown: false }} />
        {/* Add other screens as needed */}
      </Stack>
    </LanguageProvider>
  );
}