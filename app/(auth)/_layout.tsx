import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function AuthLayoutNav() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons image name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="intro"
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="verify"
        options={{
          animation: 'slide_from_right',
          presentation: 'formSheet',
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="birthday"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
