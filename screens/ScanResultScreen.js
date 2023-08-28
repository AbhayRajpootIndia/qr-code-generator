import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Share, Dimensions, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';

import * as Linking from 'expo-linking';

import ScanResultsHeader from '../components/ScanResultsHeader';

export default function ScanResultScreen(props) {
  const route = useRoute();
  const scanResults = route.params.scanResults;

  const nagivation = useNavigation();

  const screenWidth = Dimensions.get('screen').width;

  const shareFile = async () => {
    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      Sharing.shareAsync(scanResults.data)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: scanResults.data,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const openData = async () => {
    const canOpen = await Linking.canOpenURL(scanResults.data);
    if (canOpen) {
      Linking.openURL(scanResults.data)
        .then((result) => {
          if (result === false) {
            alert('Failed to open link or Data is not a link.');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <ScanResultsHeader
        title="Scan results"
        _handleShare={handleShare}
        _goBack={() => nagivation.goBack()}
      />
      <View style={styles.container}>
        <View>
          <TextInput
            mode="outlined"
            disabled={true}
            label="Type"
            value={scanResults.type.toString()}
            textColor="black"
            style={[styles.resultBoxes, { width: 0.9 * screenWidth }]}
          />
          <Pressable onPress={openData}>
            <TextInput
              mode="outlined"
              disabled={true}
              label="Data"
              value={scanResults.data}
              textColor="blue"
              style={[styles.resultBoxes, { width: 0.9 * screenWidth }]}
            />
          </Pressable>
          <TextInput
            mode="outlined"
            disabled={true}
            label="Scan Date"
            value={scanResults.date}
            textColor="black"
            style={[styles.resultBoxes, { width: 0.9 * screenWidth }]}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBoxes: {
    backgroundColor: 'white',
    marginVertical: '1%',
  },
});
