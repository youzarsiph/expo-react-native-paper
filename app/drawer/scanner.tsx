import { router } from 'expo-router'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scannedBarcode, setScannedBarcode] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = (data: any) => {
    if (scannedBarcode === false) {
      JSON.stringify(data);
      setScannedBarcode(data);
      Alert.alert(
        "Barcode Scanned",
        `${JSON.stringify(data.data)}`,
        [
          { text: 'OK', onPress: () => setScannedBarcode(false) }
        ]
      );
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "datamatrix"] }}
      >
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}>
            <View style={styles.rectangleColor} />
            <View style={styles.topLeft} />
            <View style={styles.topRight} />
            <View style={styles.bottomLeft} />
            <View style={styles.bottomRight} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: 'black'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    borderLeftColor: 'rgba(0, 0, 0, .6)',
    borderRightColor: 'rgba(0, 0, 0, .6)',
    borderTopColor: 'rgba(0, 0, 0, .6)',
    borderBottomColor: 'rgba(0, 0, 0, .6)',
    borderLeftWidth: deviceWidth / 5,
    borderRightWidth: deviceWidth / 5,
    borderTopWidth: deviceHeight / 2,
    borderBottomWidth: deviceHeight / 4
  },
  rectangleColor: {
    height: 250,
    width: 250,
    backgroundColor: 'transparent'
  },
  topLeft: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    top: -1,
    borderLeftColor: 'white',
    borderTopColor: 'white'
  },
  topRight: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    top: -1,
    borderRightColor: 'white',
    borderTopColor: 'white'
  },
  bottomLeft: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    bottom: -1,
    borderLeftColor: 'white',
    borderBottomColor: 'white'
  },
  bottomRight: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderRightColor: 'white',
    borderBottomColor: 'white'
  }
});