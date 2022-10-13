import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Keyboard,
  ImageBackground,
} from "react-native";
import api from "./service/api";
import { styles } from "./styles";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [idPokemon, setidPokemon] = useState(156);
  const [erroMsg, setErroMsg] = useState("");

  useEffect(() => {
    getUserFromStorage();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      const min = Math.ceil(1);
      const max = Math.floor(156);
      setidPokemon(Math.floor(Math.random() * (max - min + 1)) + min);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [idPokemon]);

  const getUserFromStorage = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        console.log(user);

        // Alert.alert(`Olá ${user?.name}`, "Seja bem vindo ao todo!");
      } else {
        console.log("usuario nao logado!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post("/login/", { email, password });

      await AsyncStorage.setItem(
        "token",
        JSON.stringify(response.data.data.token)
      );
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );
      Alert.alert(
        `Olá ${response.data.data.user.name}`,
        "Seja bem vindo ao todo!"
      );

      setErroMsg("");
      setLoading(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error?.data);
      setErroMsg(error?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const getPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      setidPokemon(json.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/postit.jpg")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={styles.container}>
            {/* <Image
          source={require("./assets/favicon.png")}
          style={{
            width: 100,
            height: 100,
          }}
        /> */}
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`,
              }}
              style={{ width: 150, height: 200 }}
              resizeMode={"contain"}
            />

            <Text style={styles.title}>TODO LIST</Text>
            <Text style={styles.subTitle}>
              Use nosso aplicativo de lista de tarefas!
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"white"}
                onChangeText={(email) => setEmail(email.toLowerCase())}
                keyboardType={"email-address"}
                keyboardAppearance={"dark"}
                autoFocus
                autoCorrect={false}
                autoCapitalize={"none"}
                value={email}
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={"white"}
                onChangeText={(pass) => setPassword(pass)}
                keyboardAppearance={"dark"}
                autoCapitalize={"none"}
                value={password}
                onSubmitEditing={signIn}
              />
            </View>
            {!!erroMsg && <Text style={{ color: "red" }}>{erroMsg} </Text>}

            <TouchableOpacity onPress={signIn} style={styles.touchable}>
              {loading ? (
                <ActivityIndicator size={"small"} color={"black"} />
              ) : (
                <Text style={styles.touchableText}>Login</Text>
              )}
            </TouchableOpacity>

            <StatusBar style="auto" />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
