import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_700Bold,
  Fredoka_300Light,
  Fredoka_600SemiBold,
} from '@expo-google-fonts/fredoka';
import { SplashScreen, useRouter, Slot, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import config from '../tamagui.config';
import { TamaguiProvider, Text, Theme } from 'tamagui';
import auth from '@react-native-firebase/auth';
// import * as SecureStore from 'expo-secure-store';

// // Cache the Clerk JWT
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/intro',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Fredoka_400Regular,
    Fredoka_700Bold,
    Fredoka_300Light,
    Fredoka_600SemiBold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>{loaded && <RootLayoutNav />}</AuthProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

function RootLayoutNav() {
  const { isSignedIn, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    const inTabsGroup = segments[0] === '(tabs)';
    if (isSignedIn && !inTabsGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/intro');
    }
  }, [isSignedIn, isLoading]);

  return <Slot />;
}
