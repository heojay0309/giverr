import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { XStack, YStack, ZStack } from 'tamagui';

type UserNameProps = {
  userName: string;
  setToggle: (e: boolean) => void;
  setUserName: (e: string) => void;
};
const NameUserInput = ({ userName, setUserName, setToggle }: UserNameProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    if (firstName.length > 0 && lastName.length > 0) {
      setUserName(firstName + ' ' + lastName);
      setToggle(true);
    } else setToggle(false);
  }, [firstName, lastName]);

  return (
    <View style={styles.container}>
      <YStack
        flex={1}
        space="$2"
        borderWidth={2}
        borderColor="transparent"
        borderRadius="$4"
        padding="$2"
      >
        <XStack maxWidth={250} padding="$2" alignSelf="center" space>
          <TextInput
            style={styles.InputBubble}
            value={firstName}
            placeholder="FIRST NAME"
            onChangeText={setFirstName}
          />
        </XStack>
        <XStack maxWidth={250} padding="$2" alignSelf="center" space>
          <TextInput
            style={styles.InputBubble}
            value={lastName}
            placeholder="LAST NAME"
            onChangeText={setLastName}
          />
        </XStack>
      </YStack>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputBubble: {
    borderRadius: 10,
    textAlign: 'center',
    width: '100%',
    height: 50,
    fontSize: 18,
    fontFamily: 'Fredoka_400Regular',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
});
export default NameUserInput;
