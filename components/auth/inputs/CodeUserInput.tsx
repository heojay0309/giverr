import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';
type UserCodeProps = {
  confirmationCode: string;
  setToggle: (e: boolean) => void;
  setConfirmationCode: (e: string) => void;
};

const CodeUserInput = ({
  confirmationCode,
  setConfirmationCode,
  setToggle,
}: UserCodeProps) => {
  const router = useRouter();
  const [codeDigitsArray, setCodeDigitsArray] = useState<string[]>(
    Array(6).fill('')
  );
  // Create an array of refs
  const inputRefs = useRef<Array<TextInput | null>>([]);
  inputRefs.current = inputRefs.current.slice(0, 6); // Ensure the refs array only has 6 elements

  useEffect(() => {
    const verificationCode = codeDigitsArray.join('');
    setConfirmationCode(verificationCode);
    setToggle(verificationCode.length > 5);
  }, [codeDigitsArray]);

  const handleInput = (text: string, index: number) => {
    const newCodeDigitsArray = [...codeDigitsArray];
    newCodeDigitsArray[index] = text;
    setCodeDigitsArray(newCodeDigitsArray);
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  // const handleResend = () => {
  // };

  return (
    <View style={styles.container}>
      <View style={styles.codeInputContainer}>
        {codeDigitsArray.map((digit, index) => (
          <TextInput
            key={`input-${index}`}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={digit}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="•"
            autoComplete="one-time-code"
            onKeyPress={(key) => {
              if (key.nativeEvent.key === 'Backspace' && digit === '') {
                if (index !== 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }
            }}
          />
        ))}
      </View>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribute space between the inputs and the button
    padding: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    flex: 1,
    borderColor: 'gray',
    borderRadius: 10,
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Fredoka_400Regular',
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Fredoka_600SemiBold',
  },
});

export default CodeUserInput;
