// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { initI18n } from './i18n';
import './i18n'; // keep types/intellisense happy if needed
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { initI18n().then(() => setReady(true)); }, []);
  if (!ready) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>;
  return (
    <I18nextProvider i18n={i18n}>
      <Stack screenOptions={{ headerShown: false }} />
    </I18nextProvider>
  );
}