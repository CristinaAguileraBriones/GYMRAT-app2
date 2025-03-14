import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son requeridos")
      return
    }
  
    try {
      const response = await axios.post("http://192.168.1.34:5000/api/auth/login", {
        email,
        password,
      })
  
      if (response.status === 200 && response.data.authToken) {
        // Guardar el token
        const token = response.data.authToken;
        await AsyncStorage.setItem("authToken", token)
  
        // Decodificar token y mostrar en consola
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded)
  
        // Intentar obtener el rol
        const decodeRole = decoded.role 
        console.log("Rol de usuario:", decodeRole)
  
        let route = "/pantallas/home-usuario"; // Ruta por defecto
        if (decodeRole === "proff") {
          route = "/pantallas/home-profesor";
        } else if (decodeRole === "admin") {
          route = "/pantallas/home-admin";
        }
  
        Alert.alert("Bienvenido", "Inicio de sesión exitoso", [
          {
            text: "OK",
            onPress: () => router.push(route),
          },
        ]);
      } else {
        Alert.alert("Error", "No se pudo iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      Alert.alert("Error", error.response?.data?.message || "No se pudo conectar con el servidor");
    }
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
})
