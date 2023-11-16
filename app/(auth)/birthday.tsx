import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { birthdayReq } from '@/constants/onBoarding';
import UserInput from '@/components/auth/UserInput';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { createUserProfile } from '../../utils/firestore/createUserProfile';

type UserBirthday = {
  month: string;
  day: string;
  year: string;
};

const BirthdayPage = () => {
  const router = useRouter();
  const [userBirthday, setUserBirthday] = useState<UserBirthday>({
    month: '',
    day: '',
    year: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const didCompleted = async () => {
      try {
        console.log('userBirthday', userBirthday);
        const saveUserBirthday = await createUserProfile({
          birthday: `${userBirthday.year}-${userBirthday.month}-${userBirthday.day}`,
        });

        console.log('saved?', saveUserBirthday);

        console.log('user', auth().currentUser);
      } catch (error) {
        console.log('error with Name', error);
      }
      setIsLoading(false);
    };
    if (isLoading) {
      didCompleted();
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <UserInput
        page={birthdayReq}
        name={'birthday'}
        isLoading={isLoading}
        inputValue={userBirthday}
        valueChange={setUserBirthday as (newValue: UserBirthday) => void}
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
