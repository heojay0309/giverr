import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import PhoneUserInput from './inputs/PhoneUserInput';
import NameUserInput from './inputs/NameUserInput';
import CodeUserInput from './inputs/CodeUserInput';
import BirthdayUserInput from './inputs/BirthdayUserInput';
import NextButton from './buttons/NextButton';

type PageType = 'phonePage' | 'verifyPage' | 'namePage' | 'birthdayPage';
interface PageInfo {
  pageTitle: string;
  pageDescription: string;
}

type UserBirthday = {
  month: string;
  day: string;
  year: string;
};
type InputValue = string | UserBirthday;
type ValueChangeFunction = (newValue: InputValue) => void;

interface UserInputProps {
  name: PageType;
  page: PageInfo;
  isLoading: boolean;
  inputValue: InputValue;
  valueChange: ValueChangeFunction;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInput: React.FC<UserInputProps> = ({
  name,
  page,
  isLoading,
  inputValue,
  valueChange,
  setIsLoading,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleClickConfirm = () => {
    setIsLoading(true);
  };

  const renderInputField = () => {
    switch (name) {
      case 'phonePage':
        return (
          <PhoneUserInput
            setUserPhoneNumber={valueChange}
            userPhoneNumber={inputValue as string}
            setToggle={setToggle}
          />
        );
      case 'verifyPage':
        return (
          <CodeUserInput
            confirmationCode={inputValue as string}
            setToggle={setToggle}
            setConfirmationCode={valueChange}
          />
        );
      case 'namePage':
        return (
          <NameUserInput
            setUserName={valueChange}
            userName={inputValue as string}
            setToggle={setToggle}
          />
        );
      case 'birthdayPage':
        return (
          <BirthdayUserInput
            setUserBirthday={valueChange}
            userBirthday={inputValue as UserBirthday}
            setToggle={setToggle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>{page.pageTitle}</Text>
            <Text style={styles.description}>{page.pageDescription}</Text>
          </View>
          <View style={styles.inputContainer}>{renderInputField()}</View>
        </View>
        <View style={styles.nextButtonContainer}>
          {toggle && (
            <NextButton
              onPress={handleClickConfirm}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    marginTop: 10,
    gap: 8,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Fredoka_600SemiBold',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Fredoka_300Light',
    padding: 10,
    fontSize: 12,
  },
  inputContainer: {
    marginTop: 15,
  },
  nextButtonContainer: {
    alignSelf: 'flex-end',
  },
});

export default UserInput;
