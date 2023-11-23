import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { XStack, YStack, ZStack } from 'tamagui';

type UserBirthday = {
  month: string;
  day: string;
  year: string;
};

type UserBirthdayProps = {
  userBirthday: UserBirthday;
  setToggle: (e: boolean) => void;
  setUserBirthday: (newValue: UserBirthday) => void;
};

const BirthdayUserInput: React.FC<UserBirthdayProps> = ({
  userBirthday,
  setUserBirthday,
  setToggle,
}) => {
  // Handler functions to update each part of the birthday
  const handleMonthChange = (newMonth: string) => {
    const newBirthday = {
      ...userBirthday,
      month: newMonth,
    };
    setUserBirthday(newBirthday);
  };

  const handleDayChange = (newDay: string) => {
    const newBirthday = {
      ...userBirthday,
      day: newDay,
    };
    setUserBirthday(newBirthday);
  };

  const handleYearChange = (newYear: string) => {
    const newBirthday = {
      ...userBirthday,
      year: newYear,
    };
    setUserBirthday(newBirthday);
  };
  // Function to check if the month input is valid (i.e., between 1 and 12)
  const isMonthValid = () => {
    const monthNum = parseInt(userBirthday.month, 10);
    return monthNum > 0 && monthNum <= 12;
  };
  // Function to check if the day input is valid (i.e., between 1 and 31)
  const isDayValid = () => {
    const dayNum = parseInt(userBirthday.day, 10);
    return dayNum > 0 && dayNum <= 31;
  };
  // Function to check if the year input is valid (i.e., between 1900 and 2023)
  const isYearValid = () => {
    const yearNum = parseInt(userBirthday.day, 10);
    const currentYear = new Date().getFullYear();
    return yearNum > 1900 && yearNum <= currentYear;
  };

  useEffect(() => {
    if (userBirthday.year.length == 4) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [userBirthday.year]);

  return (
    <View style={styles.container}>
      <View style={styles.birthdayContainer}>
        <XStack alignSelf="center" space>
          <TextInput
            style={styles.InputBubble}
            placeholder="MM"
            maxLength={2}
            value={userBirthday.month}
            keyboardType="number-pad" // This ensures that only numbers can be entered
            onChangeText={handleMonthChange}
          />
          <TextInput
            style={styles.InputBubble}
            placeholder="DD"
            maxLength={2}
            editable={userBirthday.month.length === 2 && isMonthValid()} // Day input is editable only if month is valid
            value={userBirthday.day}
            keyboardType="number-pad" // This ensures that only numbers can be entered
            onChangeText={handleDayChange}
          />
          <TextInput
            style={styles.InputBubble}
            placeholder="YYYY"
            maxLength={4}
            value={userBirthday.year}
            editable={userBirthday.day.length === 2 && isDayValid()} // Year input is editable only if day is valid
            keyboardType="number-pad" // This ensures that only numbers can be entered
            onChangeText={handleYearChange}
          />
        </XStack>
      </View>
      <Text style={styles.text}>
        Your birthday may be shared with other users who have your number in
        their contacts.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribute space between the inputs and the button
    padding: 20,
  },
  birthdayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  InputBubble: {
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    height: 50,
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Fredoka_400Regular',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12, // Sets the size of the font
    textAlign: 'center', // Centers the text
    fontFamily: 'Fredoka_300Light',
    color: 'gray', // Sets the text color
    padding: 25,
  },
});

export default BirthdayUserInput;
