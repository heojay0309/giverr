import { StyleSheet, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen() {
  console.log(auth().currentUser);
  return (
    <View style={styles.container}>
      <Text>Hello Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
