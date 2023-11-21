import {
  Feather,
  Entypo,
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { Text } from 'react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  name: React.ComponentProps<
    | typeof Entypo
    | typeof Feather
    | typeof AntDesign
    | typeof Ionicons
    | typeof MaterialIcons
    | typeof MaterialCommunityIcons
  >['name'];
  color: React.ComponentProps<
    | typeof Entypo
    | typeof Feather
    | typeof AntDesign
    | typeof Ionicons
    | typeof MaterialIcons
    | typeof MaterialCommunityIcons
  >['color'];
  iconFamily: React.ComponentType<any>;
}) => {
  return <props.iconFamily size={28} style={{ marginBottom: -3 }} {...props} />;
};

export default function TabLayout() {
  const { isSignedIn, isLoading } = useAuth();
  const router = useRouter();
  const user = auth().currentUser;

  // useEffect(() => {
  //   if (!user?.displayName) {
  //     router.push('/name');
  //   }
  // }, []);

  // if (!isSignedIn) {
  //   return router.replace('/');
  // }
  // if (isLoading) {
  //   return <Text>Loading ...</Text>;
  // }
  // if (!isSignedIn) {
  //   return <Redirect href="/intro" />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} iconFamily={Feather} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="gift"
        options={{
          title: 'Gift',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="gift-outline"
              color={color}
              iconFamily={MaterialCommunityIcons}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="account"
              color={color}
              iconFamily={MaterialCommunityIcons}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
