import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Spinner, Button } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
type NextButtonProps = {
  isLoading: boolean;
  onPress: (e: any) => void;
  setIsLoading: (e: boolean) => void;
};

const NextButton: React.FC<NextButtonProps> = ({ isLoading, onPress }) => {
  return (
    <Button
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
      circular
      size="$5"
    >
      {isLoading ? (
        <Spinner size="small" color="white" />
      ) : (
        <ChevronRight size="$3" />
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    marginBottom: 10,
  },
});

export default NextButton;
