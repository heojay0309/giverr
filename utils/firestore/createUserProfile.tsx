import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Contact } from 'expo-contacts';

export const createUserProfile = async (userProfileData: {
  birthday: string;
}) => {
  try {
    const user = auth().currentUser;
    if (user) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(userProfileData, { merge: true });
      return () => true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching userdata: ', error);
    throw error;
  }
};

export const fetchUserData = async (userId: string) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      // Handle the case where the user does not exist in Firestore
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw error;
  }
};

export const checkUserData = (userData: any) => {
  // Replace 'requiredField' with the actual field name you are looking for
  return userData && userData.birthday !== undefined;
};

export const saveContactsToFirestore = async (contacts: Contact[]) => {
  const user = auth().currentUser;
  if (!user) {
    console.log('No user logged in!');
    return;
  }

  const filteredData = contacts
    .filter((contact) => {
      return contact.birthday !== undefined;
    })
    .map((contact) => ({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumbers,
      birthday: contact.birthday,
      image: contact.image,
    }));

  // Get a reference to the Firestore document
  const userContactsRef = firestore().collection('userContacts').doc(user.uid);

  try {
    await userContactsRef.set({ filteredData }, { merge: true });
    console.log('Contacts saved to Firestore!');
  } catch (error) {
    console.error('Error saving contacts: ', error);
  }
};
