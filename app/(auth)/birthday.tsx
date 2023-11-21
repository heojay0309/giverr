import { StyleSheet, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

import UserInput from '@/components/auth/UserInput';
import { useAuth } from '@/context/AuthContext';

import { birthdayReq } from '@/constants/onBoarding';

const BirthdayPage = () => {
  const [userBirthday, setUserBirthday] = useState<any>({
    month: '',
    day: '',
    year: '',
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAuth();

  useEffect(() => {
    const didCompleted = async () => {
      setIsLoading(true);
      try {
        const usersBirthday = `${userBirthday.year}-${userBirthday.month}-${userBirthday.day}`;
        userData.setUserBirthday(usersBirthday);

        setPendingVerification(true);
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
        page={birthdayReq}
        name={'birthdayPage'}
        isLoading={isLoading}
        inputValue={userBirthday}
        valueChange={setUserBirthday}
        setIsLoading={setIsLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});
export default BirthdayPage;
