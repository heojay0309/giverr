import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type NextButtonProps = {
  isLoading: boolean;
  onPress: (e: any) => void;
  setIsLoading: (e: boolean) => void;
};

const NextButton: React.FC<NextButtonProps> = ({ isLoading, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <AntDesign name="rightcircle" size={30} color="#FFF" /> // Adjust icon name and size as needed
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Half of width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default NextButton;
