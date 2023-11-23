import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import {
  createUserProfile,
  fetchUserData,
  checkUserData,
} from '@/utils/firestore/createUserProfile';

type AuthContextType = {
  phoneNumber: string | null;
  setPhoneNumber: (value: string | null) => void;
  verificationCode: string | null;
  setVerificationCode: (value: string | null) => void;
  confirmationResult: any;
  setConfirmationResult: (value: any) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  userBirthday: string | null;
  setUserBirthday: (birthday: string | null) => void;
  isSignedIn: boolean | null;
  setIsSignedIn: (value: boolean) => void;
  isLoading: boolean | null;
  setIsLoading: (value: boolean) => void;
  signIn: (e: any) => Promise<void>;
  signOut: () => void;
};

const defaultAuthContextValue: AuthContextType = {
  phoneNumber: null,
  setPhoneNumber: (phoneNumber) => {},
  verificationCode: null,
  setVerificationCode: (verificationCode) => {},
  confirmationResult: null,
  setConfirmationResult: () => {},
  userName: null,
  setUserName: (userName) => {},
  userBirthday: null,
  setUserBirthday: (userBirthday) => {},
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => {},
  isLoading: false,
  setIsLoading: (isLoading) => {},
  signIn: async (e: any) => {},
  signOut: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userBirthday, setUserBirthday] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //listen to verificationCode and invoke the ConfirmationResult with the code here.
  // useEffect(() => {
  //   const handleSignInWithPhoneNumber = async () => {
  //     setIsLoading(true);
  //     try {
  //       if (phoneNumber) {
  //         const sendCode = await auth().signInWithPhoneNumber(
  //           phoneNumber,
  //           true
  //         );
  //         setConfirmationResult(sendCode);
  //       }
  //     } catch (error) {
  //       console.error('error', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if (phoneNumber) {
  //     handleSignInWithPhoneNumber();
  //   }
  // }, [phoneNumber]);

  //listen to verificationCode and invoke the ConfirmationResult with the code here.
  // useEffect(() => {
  //   const handleVerify = async () => {
  //     setIsLoading(true);
  //     try {
  //       if (confirmationResult && verificationCode) {
  //         await confirmationResult.confirm(verificationCode);
  //       }
  //     } catch (error) {
  //       console.error('error', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if (verificationCode) {
  //     handleVerify();
  //   }
  // }, [verificationCode]);

  //listen to userName and update the userName here
  // useEffect(() => {
  //   const handleUserName = async () => {
  //     setIsLoading(true);
  //     try {
  //       await auth().currentUser?.updateProfile({
  //         displayName: userName,
  //       });
  //     } catch (error) {
  //       console.log('error with Name', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if (userName) {
  //     handleUserName();
  //   }
  // }, [userName]);

  //listen to userBirthday and update the birthday here
  useEffect(() => {
    const handleUserBirthday = async () => {
      setIsLoading(true);
      try {
        if (userBirthday) {
          await createUserProfile({
            birthday: userBirthday,
          });
        }
        if (userName) {
          await auth().currentUser?.updateProfile({
            displayName: userName,
          });
        }
        await signIn(auth().currentUser);
      } catch (error) {
        console.log('error with Name', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userBirthday) {
      handleUserBirthday();
    }
  }, [userBirthday]);

  const signIn = async (user: any) => {
    setIsLoading(true);
    try {
      if (user) {
        if (user.displayName) {
          const fetchedData = await fetchUserData(user.uid);
          const userDataChecked = await checkUserData(fetchedData);
          if (userDataChecked) {
            setIsSignedIn(true);
          } else {
            setIsSignedIn(false);
          }
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error signing in', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  // Subscribe to onAuthState: listen for signIn and signOut
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(signIn);
    unsubscribe();
  }, [auth]);

  // Subscribe to onAuthState: listen for signOut
  const signOut = async () => {
    try {
      setIsLoading(true);
      if (auth().currentUser) {
        await auth().signOut();
      }
      setPhoneNumber(null);
      setConfirmationResult(null);
      setVerificationCode(null);
      setUserName(null);
      setUserBirthday(null);
      setIsSignedIn(false);
    } catch (error) {
      console.log('error in signing out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        verificationCode,
        setVerificationCode,
        confirmationResult,
        setConfirmationResult,
        userName,
        setUserName,
        userBirthday,
        setUserBirthday,
        isSignedIn,
        setIsSignedIn,
        isLoading,
        setIsLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
