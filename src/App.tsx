
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageGrid from './components/LanguageGrid';
import Home from './pages/Home';
import Information from './pages/Information';
import Courses from './pages/Courses';
import Community from './pages/Community';
import Videos from './pages/Videos';
import GermanLearning from './pages/GermanLearning';
import NotFound from './pages/NotFound';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <LanguageProvider>
        <Stack.Navigator initialRouteName="LanguageSelection" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LanguageSelection" component={LanguageGrid} />
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
