import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../utils/request";
import { getLocalUserData } from "../utils/auth";
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const PicturePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("file", {
      uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
      name: "upload.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const userData = await getLocalUserData();
      await api.post(`/users/${userData.id}/profile-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total !== undefined) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          } else {
            console.log("Upload in progress, but total size is unknown");
          }
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress(0);
    }
  };

  const deleteImage = () => {
    setImage(null);
    setUploadProgress(0);
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      borderRadius: 100,
      borderWidth: 3,
      borderColor: '#007BFF',
      position: 'absolute',
      borderLeftColor: 'transparent',
      transform: [
        { 
          rotate: withTiming(`${uploadProgress * 3.6}deg`, { 
            duration: 300 
          }) 
        }
      ],
    };
  }, [uploadProgress]);

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, styles.fancyBorder]}>
            <Image source={{ uri: image }} style={styles.image} />
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={deleteImage}
            >
              <View style={styles.deleteIconContainer}>
                <Ionicons name="close-circle" size={26} color="#FF3B30" />
              </View>
            </TouchableOpacity>
          </View>
          
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <View style={styles.progressOverlay}>
              <Animated.View style={progressAnimatedStyle} />
              <Text style={styles.progressText}>{Math.round(uploadProgress)}%</Text>
            </View>
          ) : uploadProgress === 100 ? (
            <View style={styles.checkmarkContainer}>
              <Ionicons name="checkmark-circle" size={36} color="#FFFFFF" />
            </View>
          ) : null}
        </View>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.placeholderContainer}>
          <Ionicons name="camera" size={40} color="#007BFF" />
          <Text style={styles.placeholderText}>Select Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  imageContainer: {
    width: 150,
    height: 150,
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    overflow: 'visible',
    position: 'relative',
  },
  fancyBorder: {
    borderWidth: 2,
    borderColor: '#007BFF',
    padding: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 69,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  progressOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  progressText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  successContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: '#007BFF',
    borderRadius: 75,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 15,
  },
  placeholderContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#CCC",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6F9",
  },
  placeholderText: {
    marginTop: 10,
    color: "#666",
    fontFamily: "Poppins",
  },
  deleteButton: {
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
    zIndex: 20,
    elevation: 10,
    width: 30,
    height: 30,
  },
  deleteIconContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 5,
  },
});

export default PicturePicker;
