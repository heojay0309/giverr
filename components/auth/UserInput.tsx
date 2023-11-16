import {
  Text,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { NameUserInput, BirthdayUserInput } from './inputs/index';
import NextButton from './buttons/NextButton';
import { useEffect, useState } from 'react';
type UserBirthday = {
  month: string;
  day: string;
  year: string;
};
type ValueChangeFunction =
  | ((newValue: UserBirthday) => void)
  | ((newValue: string) => void);

interface UserInputProps {
  name: string;
  page: {
    pageTitle: string;
    pageDescription: string;
  };
  isLoading: boolean;
  inputValue: string | UserBirthday;
  valueChange: ValueChangeFunction;
  setIsLoading: (e: boolean) => void;
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
  const { pageTitle, pageDescription } = page;

  const handleClickConfirm = () => {
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>{pageTitle}</Text>
            <Text style={styles.description}>{pageDescription}</Text>
          </View>
          <View style={styles.inputContainer}>
            {name == 'name' && (
              <NameUserInput
                setUserName={valueChange as (newValue: string) => void}
                userName={inputValue as string}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setToggle={setToggle}
              />
            )}
            {name == 'birthday' && (
              <BirthdayUserInput
                setUserBirthday={
                  valueChange as React.Dispatch<
                    React.SetStateAction<UserBirthday>
                  >
                }
                userBirthday={inputValue as UserBirthday}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setToggle={setToggle}
              />
            )}
          </View>
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
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontStyle: 'italic',
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
