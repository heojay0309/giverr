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
import { useEffect, useState } from 'react';
import { Gift, Home, CalendarDays } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import { Calendar } from 'react-native-calendars';

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
  const { isSignedIn } = useAuth();
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontFamily: 'Fredoka_400Regular', fontSize: 11 },
        tabBarActiveTintColor: Colors['light'].tint,
        tabBarItemStyle: { marginBottom: -3 },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitle: '',
        headerRight: () => (
          <>
            <Button
              marginRight="$3"
              shadowColor={'gray'}
              backgroundColor="transparent"
              pressStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <CalendarDays color="$colorTransparent" size={'$2.5'} />
            </Button>
            {showCalendar && (
              <Calendar
                style={{
                  position: 'absolute',
                  right: '20%',
                  paddingHorizontal: 50,
                  borderWidth: 1,
                  minWidth: 350,
                  minHeight: 345,
                  backgroundColor: 'white',
                  shadowOpacity: 40,
                }}
                onDayPress={(day) => {
                  alert(day.dateString);
                }}
              />
            )}
          </>
        ),
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
