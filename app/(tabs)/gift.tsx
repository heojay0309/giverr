import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';

export default function GiftScreen() {
  const [searchEnable, setSearchEnable] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);

  const openScan = () => {
    setSearchEnable(true);
  };
  const closeScan = () => {
    setSearchEnable(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gift Store</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: 20,
    gap: 30,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
  },
});
