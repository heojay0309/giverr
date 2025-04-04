import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import UserInput from '@/components/auth/UserInput';
import auth from '@react-native-firebase/auth';
import { authorizationReq } from '@/constants/onBoarding';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const authData = useAuth();
  const [phoneNum, setPhoneNum] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  useEffect(() => {
    if (authData.confirmationResult) {
      setIsLoading(false);
    }
  }, [pendingVerification]);

  useEffect(() => {
    const handleSignIn = async () => {
      setIsLoading(true);
      try {
        if (phoneNum) {
          const sendCode = await auth().signInWithPhoneNumber(
            '+1' + phoneNum,
            true
          );
          authData.setConfirmationResult(sendCode);
          router.push('/verify');
        }
        setPendingVerification(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error with Wrong PhoneNumber', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoading) {
      handleSignIn();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <UserInput
        page={authorizationReq}
        name="phonePage"
        inputValue={phoneNum}
        valueChange={setPhoneNum}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});
