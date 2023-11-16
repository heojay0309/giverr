import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Pressable
        onPress={async () => {
          await auth().signOut();
          router.replace('/');
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
    fontWeight: '500',
  },
});
