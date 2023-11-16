import {
  Feather,
  Entypo,
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

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
      />
    </Tabs>
  );
}
