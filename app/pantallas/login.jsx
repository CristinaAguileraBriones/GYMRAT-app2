import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Login(){

  return (
    <View>
      <TextInput placeholder="Escribe tu correo" style= {styles.input}></TextInput>
      <TextInput placeholder="Escribe la contraseña"></TextInput>



    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: "#f0f0f0",
    flex: 1,
    justifyContent: "center"

  },

  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  }
})