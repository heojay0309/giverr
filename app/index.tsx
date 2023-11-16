import { StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

const WelcomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log('path', pathname);
  // // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Subscribe to user state changes
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) router.replace('/intro');
      // User is signed out, handle the logic here
      if (initializing) setInitializing(false);
    });

    // Return the unsubscribe function to be called on unmount
    return unsubscribe;
  }, [auth]);

  // console.log('index returned, user:', user);
  // console.log('init', initializing);

  if (initializing) return null;
  return router.replace('/home');

  // if (!user) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>WELCOME TO THE APP</Text>
  //       <Pressable onPress={() => router.push('/login')}>
  //         <Text>Get Started</Text>
  //       </Pressable>
  //     </View>
  //   );
  // }
  // if (user) {
  //   return router.replace('/home');
  // }
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
