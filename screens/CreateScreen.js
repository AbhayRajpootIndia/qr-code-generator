import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { View, StyleSheet, Keyboard, Share } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';
import * as Sharing from 'expo-sharing';

import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export default function CreateScreen() {
  const nagivation = useNavigation();

  const [qrData, setQrData] = useState('Abhay');
  const [qrSvg, setQrSvg] = useState(null);
  const [generated, setGenerated] = useState(false);

  const generateQrCode = () => {
    setGenerated((prev) => true);
    Keyboard.dismiss();
  };

  const reset = () => {
    setGenerated(false);
    setQrData('');
  };

  const handleTextChange = (text) => {
    setQrData((prev) => text);
    setGenerated((prev) => false);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'share implementation pending',
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

  const [imageUri, setImageUri] = useState();

  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();
  // ...rest of the code remains same

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const shareImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);

      if (localUri) {
        const options = {
          mimeType: 'image/jpeg',
          dialogTitle: 'Share the image',
          UTI: 'image/jpeg',
        };

        Sharing.shareAsync(localUri, options)
          .then((data) => {})
          .catch((err) => {
            console.log(JSON.stringify(err));
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Create you own QR code</Text>
      <TextInput
        mode="outlined"
        value={qrData}
        label="Enter data"
        style={styles.inputBox}
        onChangeText={handleTextChange}
        onFocus={() => setGenerated((prev) => false)}
      />

      {!generated && (
        <Button mode="contained" style={styles.button} onPress={generateQrCode}>
          Generate
        </Button>
      )}

      {generated && (
        <Button mode="contained" style={styles.button} onPress={reset}>
          Reset
        </Button>
      )}

      <View style={{ minHeight: '40%' }}>
        {generated && (
          <View
            style={styles.qrCodeContainer}
            ref={imageRef}
            collapsable={false}
          >
            <QRCode
              size={300}
              value={qrData || 'null'}
              getRef={(c) => setQrSvg(c)}
            />
          </View>
        )}
      </View>

      {generated && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '50%',
            marginTop: '5%',
          }}
        >
          <Button mode="elevated" onPress={shareImageAsync}>
            Share
          </Button>
          <Button mode="elevated" onPress={() => onSaveImageAsync()}>
            Save
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '85%',
    margin: '5%',
  },
  qrCodeContainer: {
    marginTop: '5%',
  },
});
