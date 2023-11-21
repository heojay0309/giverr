import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

type UserPhoneProps = {
  userPhoneNumber: string;
  setToggle: (e: boolean) => void;
  setUserPhoneNumber: (e: string) => void;
};
const PhoneUserInput = ({ setUserPhoneNumber, setToggle }: UserPhoneProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  // Handle changes in text input
  const handleInputChange = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Check the length and format accordingly
    let formattedNumber = '';
    if (cleaned.length <= 3) {
      formattedNumber = cleaned;
    } else if (cleaned.length <= 6) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      formattedNumber = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6)}`;
    }
    setPhoneNumber(formattedNumber); // Update local state
    setUserPhoneNumber(formattedNumber); // Update parent state
  };
  // Effect to handle validation or other side effects
  useEffect(() => {
    if (phoneNumber.length === 12) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [phoneNumber, setToggle]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBubble}
        value={phoneNumber}
        onChangeText={handleInputChange}
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputBubble: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    textAlign: 'center',
    width: '75%',
    height: 50,
    fontSize: 18,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // paddingLeft: 5,
    // alignItems: 'center',
    // flexDirection: 'column',
    // paddingVertical: 8,
    // fontWeight: '700',
    // fontSize: 24,
  },
});
export default PhoneUserInput;
