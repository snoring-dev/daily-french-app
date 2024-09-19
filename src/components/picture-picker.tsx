import React, { useState } from "react";
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
      await api.post(`/users/${7}/profile-picture`, formData, {
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
      alert("Upload successful!");
      setUploadProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.pickerCircle}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.plus}>+</Text>
        )}
      </TouchableOpacity>
      {image && (
        <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      )}
      {uploadProgress > 0 && (
        <Text style={styles.progressText}>
          Upload Progress: {uploadProgress}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  plus: {
    fontSize: 40,
    color: "#666",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});

export default PicturePicker;
