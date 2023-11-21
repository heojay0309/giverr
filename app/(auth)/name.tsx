import { StyleSheet, SafeAreaView } from 'react-native';
import { nameReq } from '@/constants/onBoarding';
import UserInput from '@/components/auth/UserInput';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const NamePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const userData = useAuth();

  useEffect(() => {
    const didCompleted = async () => {
      setIsLoading(true);
      try {
        userData.setUserName(userName);
        setPendingVerification(true);
        router.push('/birthday');
      } catch (error) {
        console.log('error with Name', error);
      } finally {
        setIsLoading(false);
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
        name={'namePage'}
        inputValue={userName}
        valueChange={setUserName}
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
