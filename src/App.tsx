import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/contexts/LanguageContext';
import LanguageGrid from './src/components/LanguageGrid';
import Home from './src/screens/Home';
import Information from './src/screens/Information';
import Courses from './src/screens/Courses';
import Community from './src/screens/Community';
import Videos from './src/screens/Videos';
import GermanLearning from './src/screens/GermanLearning';
import NotFound from './src/screens/NotFound';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <Stack.Navigator initialRouteName="LanguageGrid">
          <Stack.Screen name="LanguageGrid" component={LanguageGrid} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="Courses" component={Courses} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Videos" component={Videos} />
          <Stack.Screen name="GermanLearning" component={GermanLearning} />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </LanguageProvider>
    </NavigationContainer>
  );
}