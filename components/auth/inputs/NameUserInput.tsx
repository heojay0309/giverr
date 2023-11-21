import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
type UserNameProps = {
  userName: string;
  setToggle: (e: boolean) => void;
  setUserName: (e: string) => void;
};
const NameUserInput = ({ userName, setUserName, setToggle }: UserNameProps) => {
  useEffect(() => {
    if (userName.length > 0) setToggle(true);
    else setToggle(false);
  }, [userName]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.InputBubble}
        value={userName}
        onChangeText={setUserName}
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
  InputBubble: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    textAlign: 'center',
    width: '75%',
    height: 50,
    fontSize: 18,
    backgroundColor: 'white',
  },
});
export default NameUserInput;
