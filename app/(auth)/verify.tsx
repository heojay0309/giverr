import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import UserInput from '@/components/auth/UserInput';
import auth from '@react-native-firebase/auth';
import { verificationReq } from '@/constants/onBoarding';
import { useAuth } from '@/context/AuthContext';
import {
  fetchUserData,
  checkUserData,
} from '@/utils/firestore/createUserProfile';

export default function Verify() {
  const router = useRouter();
  const authData = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<any>('');

  useEffect(() => {
    const currentUser = auth().currentUser;

    const checkUserNameAndBirthday = async () => {
      if (currentUser?.displayName && currentUser.uid) {
        authData.setIsLoading(true);
        const fetchedData = await fetchUserData(currentUser.uid);
        const userDataChecked = await checkUserData(fetchedData);
        if (userDataChecked) {
          authData.setIsSignedIn(true);
        }
        authData.setIsLoading(false);
      }
    };

    if (currentUser?.displayName) {
      setIsLoading(false);
      checkUserNameAndBirthday();
    }
    if (pendingVerification && auth().currentUser) {
      setIsLoading(false);
      router.push('/name');
    }
  }, [pendingVerification]);

  useEffect(() => {
    const handleVerify = async () => {
      setIsLoading(true);
      try {
        if (authData.confirmationResult && confirmationCode) {
          await authData.confirmationResult.confirm(confirmationCode);
        }
        setPendingVerification(true); // Set flag to true upon successful verification
        setIsLoading(false);
      } catch (error) {
        console.error('error', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoading) {
      handleVerify();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <UserInput
        page={verificationReq}
        name="verifyPage"
        inputValue={confirmationCode}
        valueChange={setConfirmationCode}
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
