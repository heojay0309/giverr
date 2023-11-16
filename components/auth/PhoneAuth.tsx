import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { authorizationReq } from '@/constants/onBoarding';
import NextButton from './buttons/NextButton';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
type SignInProp = {
  isLoading: boolean;
  setIsLoading: (e: boolean) => void;
  setPhoneNum: (e: string) => void;
  handleSignIn: (n: string) => Promise<void>;
};

const PhoneAuth = ({
  handleSignIn,
  isLoading,
  setIsLoading,
  setPhoneNum,
}: SignInProp) => {
  const { pageTitle, pageDescription } = authorizationReq;
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = ('' + text).replace(/\D/g, '');
    // Check the length and format accordingly
    const match = cleaned.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);
    if (match) {
      // Groups found in the regex match are used to format the phone number
      const intlCode = match[1] ? `(${match[1]}) ` : '';
      const middle = match[2] ? `${match[2]}-` : '';
      const last = match[3] ? `${match[3]}` : '';
      return `${intlCode}${middle}${last}`;
    }
    console.log('text', text);
    return text;
  };

  const onPhoneChange = (text: string) => {
    console.log('text', text);
    const formattedText = formatPhoneNumber(text);
    console.log('text', formattedText);

    setPhoneNumber(formattedText);
  };

  useEffect(() => {
    if (phoneNumber.length === 14) {
      setPhoneNum(phoneNumber);
    }
  }, [phoneNumber]);

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
            <Text
              style={{
                fontWeight: '400',
                fontSize: 10,
              }}
            >
              Mobile number
            </Text>
            <TextInput
              style={styles.inputSection}
              value={phoneNumber}
              inputMode="numeric"
              onChangeText={onPhoneChange}
            />
          </View>
        </View>
        <View style={styles.nextButtonContainer}>
          {phoneNumber.length === 14 && (
            <NextButton
              onPress={handleSignIn}
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
    flex: 1,
    width: SCREEN_WIDTH,
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
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 4,
    marginHorizontal: 40,
  },
  inputSection: {
    justifyContent: 'center',
    paddingLeft: 5,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 8,
    fontWeight: '700',
    fontSize: 24,
  },
  nextButtonContainer: {
    alignSelf: 'flex-end',
  },
});

export default PhoneAuth;
