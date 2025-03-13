import { View, Text, Button, Image } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../assets/images/logo.png")} />
      <Text>¡Bienvenides!</Text>
      <Button title="Ir a Login" onPress={() => router.push("../pantallas/login")} />
    </View>
  );
}

