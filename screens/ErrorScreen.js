import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

export default function ErrorScreen() {
  const nagivation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => nagivation.navigate('CreateScreen')}
    >
      <View style={styles.container}>
        <Text variant="headlineLarge">There was an error.</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellowgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
