import { Link, Stack, useRouter } from 'expo-router';
import {
  Feather,
  Entypo,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

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
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade',
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          animation: 'slide_from_right',
          presentation: 'containedModal',
        }}
      />
      <Stack.Screen
        name="birthday"
        options={{
          animation: 'slide_from_right',
          presentation: 'containedModal',
        }}
      />
    </Stack>
  );
}
