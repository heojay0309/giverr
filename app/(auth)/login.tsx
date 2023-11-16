import { useEffect, useState } from 'react';
import { StyleSheet, Modal, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import PhoneAuth from '@/components/auth/PhoneAuth';
import PhoneVerify from '@/components/auth/PhoneVerify';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const router = useRouter();
  const [confirm, setConfirm] = useState<any | null>(null);
  const [phoneNum, setPhoneNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [hasVerifiedPhone, setHasVerifiedPhone] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Subscribe to user state changes
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user && hasVerifiedPhone) {
        router.push('/name');
      } else {
        // User is signed out, handle the logic here
      }
    });
    return unsubscribe;
  }, [hasVerifiedPhone, router]);

  console.log('confirm', confirm);

  const handleSignIn = async () => {
    const phoneNumber = phoneNum.replace(/[^\d]/g, '');
    setLoading(true);
    try {
      const sendCode = await auth().signInWithPhoneNumber('+1' + phoneNumber);
      setConfirm(sendCode);
      setPendingVerification(true);
    } catch (error) {
      console.error('Error with Wrong PhoneNumber', error);
    } finally {
      setIsModalVisible(true);
      setLoading(false);
    }
  };

  const handleVerify = async (confirmationCodes: any) => {
    setLoading(true);
    try {
      await confirm.confirm(confirmationCodes);
      setHasVerifiedPhone(true); // Set flag to true upon successful verification
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsModalVisible(false);
      setLoading(false);
    }
  };
  // Function to close the modal manually, e.g., through a cancel button
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {pendingVerification ? ( */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal} // Handle Android back button
        animationType="slide"
        transparent={false}
      >
        <PhoneVerify
          phoneNumber={phoneNum}
          handleVerify={handleVerify}
          goBack={closeModal}
        />
      </Modal>
      {/* ) : ( */}
      <PhoneAuth
        handleSignIn={handleSignIn}
        setPhoneNum={setPhoneNum}
        isLoading={loading}
        setIsLoading={setLoading}
      />
      {/* )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
});
