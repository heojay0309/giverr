import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/context/AuthContext';

export default function AccountScreen() {
  const router = useRouter();
  const authData = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Pressable
        onPress={async () => {
          // await auth().signOut();
          // router.replace('/');
          authData.signOut();
        }}
      >
        <Text>SIGN OUT</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 25,
    paddingHorizontal: 40,
    gap: 30,
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Fredoka_400Regular',
    fontWeight: '500',
  },
});
