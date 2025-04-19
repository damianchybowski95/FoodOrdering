import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [errors, setErrors] = useState<string[]>([]);
  // Image picker 
  const [image, setImage] = useState<string | null>(null);

  // Id of product that is updating
  // Component create produc screen also handles updating if id search param is present like this url?id=
  const { id } = useLocalSearchParams();
  const isUpdating = Boolean(id);

  // Function that decides if product is meant to be updated or created
  function onSubmit(){
    if( isUpdating ){
      onUpdateCreate();
    } else {
      onCreate();
    }
  }

  function onCreate() {
    if( !validateInput() ){
      return;
    }

    console.log("Create product clicked");
    
    // save in database

    resetFields();
  }

  function onUpdateCreate() {
    if( !validateInput() ){
      return;
    }

    console.log("Update product clicked");
    
    // save in database

    resetFields();
  }

  function onDelete(){
    console.log("On delete function called");
  }

  function confirmDelete() {
    console.log("Confirm delete clicked")
    Alert.alert("Confirm", "Are you sure you wan't to delete this product?", [
      {
        text : "Cancel"
      },
      {
        text : "Delete",
        style : "destructive",
        onPress : onDelete
      }
    ]);
  }

  function resetFields() {
    setName("");
    setPrice("");
  }

  function validateInput(){
    if(!name){
      setErrors(["Name is required", ...errors ]);
      return false;
    }
    if(!price){
      setErrors(["Price is required", ...errors ]);
      return false;
    }
    if(Number.isNaN(parseFloat(price))){
      setErrors(["Price is not a number", ...errors]);
      return false;
    }
    if(parseFloat(price) < 0 ){
      setErrors(["Price needs to be a positive number", ...errors]);
      return false;
    }
    setErrors([]);
    return true;
  }

  const pickImage = async () => {    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title : isUpdating ? "Update product" : "Create Product"}} />

      <Image source={{ uri : image || defaultPizzaImage }} style={styles.image }/>
      <Text onPress={pickImage} style={styles.textButton}>Select image</Text>

      <Text style={styles.label}>{ isUpdating ? "Update" : "Create" }</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>{ isUpdating ? "Update" : "Create" }</Text>
      <TextInput
        value={price.toString()}
        onChangeText={setPrice}
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color : "red"}}>{errors[0]}</Text>
      <Button onPress={onSubmit} text={ isUpdating ? "Update" : "Create" } />
      { isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  image : {
    width : "50%",
    aspectRatio : 1,
    alignSelf : "center"
  },
  textButton : {
    alignSelf : "center",
    fontWeight : "bold",
    color : Colors.light.tint,
    marginVertical : 10
  }
});
