import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useState, useEffect, createRef } from 'react';
import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';

type handleVerifyProp = {
  phoneNumber: string;
  handleVerify: (verificationCode: string) => Promise<void>;
  goBack: () => void;
};

const PhoneVerify = ({
  phoneNumber,
  handleVerify,
  goBack,
}: handleVerifyProp) => {
  const [codeDigitsArray, setCodeDigitsArray] = useState(Array(6).fill(''));

  const inputRefs = Array(6)
    .fill('')
    .map(() => createRef<TextInput>());

  let formattedPhoneNumber = phoneNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '$1-$2-$3'
  );

  useEffect(() => {
    const verificationCode = codeDigitsArray.join('');
    if (verificationCode.length === 6) {
      handleVerify(verificationCode);
    }
  }, [codeDigitsArray]);

  const handleInput = (text: string, index: number) => {
    const newCodeDigitsArray = [...codeDigitsArray];
    newCodeDigitsArray[index] = text;
    setCodeDigitsArray(newCodeDigitsArray);

    if (text && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Check your texts</Text>
        <Text style={styles.subtitle}>We've sent a 6-digit code to</Text>
        <Text style={styles.phone}>{formattedPhoneNumber}</Text>
      </View>
      <View style={styles.codeInputContainer}>
        {codeDigitsArray.map((digit, index) => (
          <TextInput
            key={`input-${index}`}
            ref={inputRefs[index]}
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={digit}
            style={styles.input}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            placeholder="•"
          />
        ))}
      </View>
      <Pressable onPress={goBack}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
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
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: '300',
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  phone: {
    fontWeight: '300',
    fontSize: 14,
    color: 'black',
    marginBottom: 16,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignContent: 'center',
    width: '80%', // Adjust as needed
    maxWidth: 300, // This ensures it doesn't stretch too much on large screens
  },
  input: {
    width: 40, // Adjusted width to accommodate six inputs side by side
    height: 56, // Adjusted height
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray', // Adjusted to be visible against most backgrounds
    textAlign: 'center',
    fontSize: 22,
    marginHorizontal: 8, // Adds space between the inputs
  },
});
export default PhoneVerify;
