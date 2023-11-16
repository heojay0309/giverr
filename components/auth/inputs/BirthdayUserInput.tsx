import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

type UserBirthday = {
  month: string;
  day: string;
  year: string;
};

interface UserBirthdayProps {
  userBirthday: UserBirthday;
  isLoading: boolean;
  setToggle: (e: boolean) => void;
  setUserBirthday: React.Dispatch<React.SetStateAction<UserBirthday>>;
  setIsLoading: (e: boolean) => void;
}

const BirthdayUserInput: React.FC<UserBirthdayProps> = ({
  userBirthday,
  setUserBirthday,
  setToggle,
}) => {
  // Handler functions to update each part of the birthday
  const handleMonthChange = (newMonth: string) => {
    setUserBirthday((prevBirthday) => ({
      ...prevBirthday,
      month: newMonth,
    }));
  };

  const handleDayChange = (newDay: string) => {
    setUserBirthday((prevBirthday) => ({
      ...prevBirthday,
      day: newDay,
    }));
  };

  const handleYearChange = (newYear: string) => {
    setUserBirthday((prevBirthday) => ({
      ...prevBirthday,
      year: newYear,
    }));
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
    width: '100%',
    padding: 20,
  },
  InputBubble: {
    borderWidth: 1,
    flex: 1,
    // width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    textAlign: 'center',
    // width: 60,
    height: 40,
    fontSize: 18,
    marginRight: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 12, // Sets the size of the font
    textAlign: 'center', // Centers the text
    color: 'gray', // Sets the text color
    padding: 20,
  },
});

export default BirthdayUserInput;
