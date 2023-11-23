import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import GiftBox from '@/components/GiftBox';
import { useEffect } from 'react';
import { saveContactsToFirestore } from '@/utils/firestore/createUserProfile';

export default function HomeScreen() {
  useEffect(() => {
    async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Birthday,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        });
        await saveContactsToFirestore(data);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <GiftBox />
      <Text style={styles.title}>HELLO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: 20,
    backgroundColor: 'inherit',
    gap: 30,
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Fredoka_400Regular',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Fredoka_400Regular',
    fontWeight: '500',
  },
});
