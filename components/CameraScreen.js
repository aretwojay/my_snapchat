import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Icon, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export function CameraScreen() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  let takePic = async () => {
    let options = {
      quality: 0,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="auto" />
      <Camera ratio='16:9' style={styles.container} ref={cameraRef} type={type}>

        <View style={styles.header}>

        </View>

        <View style={styles.buttonContainer}>
          <Button title="flip" style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </Button>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
        </View>

        <TouchableOpacity style={styles.takePic} onPress={takePic} />

      </Camera>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 650,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  // header: {
  //   justifyContent: "space-between",
  // },
  takePic: {
    position: 'absolute',
    bottom: 20,
    borderWidth: 6,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#eee',
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  }
});
