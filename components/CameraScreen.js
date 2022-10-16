import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Icon, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

export function CameraScreen() {
  const navigation = useNavigation();
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(CameraType.back);
  const [base64, setBase64] = useState();

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
      flash: 'on',
      quality: 0,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    if (type === "front") {
      const file = await ImageManipulator.manipulateAsync(newPhoto.uri, [
        { rotate: 180 },
        { flip: ImageManipulator.FlipType.Vertical }
      ],
        { compress: 1 }
      );
      setPhoto(file);
    }
    else {
      setPhoto(newPhoto);
    }

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

    FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' }).then((value) => {
      setBase64(value);
    });

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + base64 }} />
        <View style={styles.footer}>
          <View style={styles.footerBtn}>
            <Button title="Send" onPress={() => navigation.navigate("SendSnap", {data: photo})}/>
          </View>
          <View style={styles.footerBtn}>
            <Button title="Share" onPress={sharePic}/>
          </View>

          <View style={styles.footerBtn}>
          {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} style={styles.footerBtn}/> : undefined}
          </View>

          <View style={styles.footerBtn}>
            <Button title="Discard" onPress={() => setPhoto(undefined)} style={styles.footerBtn}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }} >
      <StatusBar style="auto"/>
      <Camera 
        isActive={true} 
        ratio='16:9' 
        style={styles.camera} 
        ref={cameraRef} 
        type={type}>

        <View style={styles.header}>
          <FontAwesome.Button name="camera" title="flip" style={styles.button} onPress={toggleCameraType} />
        </View>

        <TouchableOpacity style={styles.takePic} onPress={takePic} />

      </Camera>
    </View>
  );

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingRight: 0,
  },
  camera: {
    width: '100%',
    marginTop: 70,
    marginBottom: 70,
    height: 650,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#000000', 
  },
  header: {
    position: "absolute",
    top: 3,
    right: 0,
    margin: 10,
  },
  footer: {
    flexDirection: "row",
    bottom: 120,
    left: 0,
    paddingLeft: 10
  },
  footerBtn: {
    marginHorizontal: 10,
  },
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
    width: '100%',
    marginTop: 70,
    marginBottom: 70,
    height: 650,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  }
});
