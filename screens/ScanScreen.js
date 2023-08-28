import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function ScanScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const date = new Date();
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate('ScanResultScreen', {
      scanResults: { type, data, date: date.toString() },
    });
  };

  if (!isFocused) {
    return <View></View>;
  } else {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <>
        <View style={styles.container}>
          <Text variant="headlineSmall" style={styles.text}>
            Scan a QR Code
          </Text>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.cameraViewFinder}
          />
          <QRScannerOverlay />
          {scanned && (
            <Button
              title={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  cameraViewFinder: {
    position: 'absolute',
    width: '160%',
    height: '120%',
  },
});

function QRScannerOverlay() {
  const height = Dimensions.get('screen').height;
  const scannerBoxHeight = 0.33 * height;
  const verticalOffset = useSharedValue(scannerBoxHeight / 2);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: verticalOffset.value }],
  }));

  useEffect(() => {
    verticalOffset.value = withRepeat(
      withTiming(-verticalOffset.value, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  return (
    <View style={QRScannerOverlayStyles.container}>
      <View
        style={[
          QRScannerOverlayStyles.row,
          { backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.3)' },
        ]}
      ></View>

      <View style={[QRScannerOverlayStyles.row, { flex: 1 }]}>
        <View
          style={[
            QRScannerOverlayStyles.column,
            { backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.3)' },
          ]}
        ></View>

        <View
          style={[
            QRScannerOverlayStyles.column,
            {
              flex: 4,
              borderStartStartRadius: 10,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <View style={QRScannerOverlayStyles.frameCornersContainer}>
            <View
              style={{
                width: '100%',
                height: '25%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  borderTopWidth: 2,
                  borderLeftWidth: 2,
                  borderColor: 'white',
                }}
              ></View>
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  borderTopWidth: 2,
                  borderRightWidth: 2,
                  borderColor: 'white',
                }}
              ></View>
            </View>
            <View
              style={{
                width: '100%',
                height: '25%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                  borderColor: 'white',
                }}
              ></View>
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  borderBottomWidth: 2,
                  borderRightWidth: 2,
                  borderColor: 'white',
                }}
              ></View>
            </View>
          </View>
          <Animated.View
            style={[QRScannerOverlayStyles.scanAnimationLine, animatedStyles]}
          />
        </View>

        <View
          style={[
            QRScannerOverlayStyles.column,
            { backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.3)' },
          ]}
        ></View>
      </View>

      <View
        style={[
          QRScannerOverlayStyles.row,
          { backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.3)' },
        ]}
      ></View>
    </View>
  );
}

const QRScannerOverlayStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  scanAnimationLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  frameCornersContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
  },
});
