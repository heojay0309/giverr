import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { nameReq } from '@/constants/onBoarding';
import UserInput from '@/components/auth/UserInput';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
const NamePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to user state changes
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged Name:', user?.displayName);
      if (user?.displayName) {
        setIsLoading(false);
        return router.push('/birthday');
      } else {
        setIsLoading(false);
        // User is signed out, handle the logic here
      }
    });

    // Return the unsubscribe function to be called on unmount
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const didCompleted = async () => {
      try {
        await auth().currentUser?.updateProfile({
          displayName: userName,
        });
        setIsLoading(false);
      } catch (error) {
        console.log('error with Name', error);
      }
    };
    if (isLoading) {
      didCompleted();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <UserInput
        page={nameReq}
        name={'name'}
        inputValue={userName}
        valueChange={setUserName as (newValue: string) => void}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});
export default NamePage;
