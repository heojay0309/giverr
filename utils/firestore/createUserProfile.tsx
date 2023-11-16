import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// Function to create a new user document
export const createUserProfile = async (userProfileData: {
  birthday: string;
}) => {
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
};
