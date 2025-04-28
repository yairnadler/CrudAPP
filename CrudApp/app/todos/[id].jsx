import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageTodos && storageTodos.length) {
          const myTodo = storageTodos.find((todo) => todo.id.toString() === id);
          setTodo(myTodo);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData(id);
  }, [id]);

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

  const handleSave = async () => {
    if (todo.title === "") {
      // Alert.alert("Empty Todo", "Looks like you forgot to enter a todo", [
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
      console.log("can't update to empty todo")
      return;
    }
    try {
      const savedTodo = { ...todo, title: todo.title };

      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (storageTodos && storageTodos.length) {
        const otherTodos = storageTodos.filter(
          (todo) => todo.id !== savedTodo.id
        );
        const allTodos = [...otherTodos, savedTodo];
        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos));
      } else {
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo]));
      }
      console.log(`todo updated to -> ${todo.title}`);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.setThemeRow}>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          <Ionicons
            name={colorScheme === "dark" ? "sunny" : "moon"}
            size={30}
            color={colorScheme === "dark" ? "papayawhip" : "black"}
          ></Ionicons>
        </Pressable>
      </View>
      <TextInput
        style={styles.inputText}
        multiline={true}
        placeholder="Edit TODO"
        placeholderTextColor="grey"
        value={todo?.title || ""}
        onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))}
      />
      <View style={styles.row}>
        <Pressable
          style={styles.button}
          // disabled={disabled}
          onPress={() => handleSave()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => router.push("/")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Cancel</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme, disabled) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.background,
    },
    setThemeRow: {
      marginHorizontal: "auto",
      marginTop: 10,
      marginBottom: 10,
    },
    inputText: {
      flexWrap: "wrap",
      width: "90%",
      fontFamily: "Inter_500Medium",
      fontSize: 24,
      fontWeight: "bold",
      borderWidth: 1.5,
      borderRadius: 10,
      borderColor: "grey",
      color: theme.text,
    },
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 50,
      marginBottom: 10,
      marginHorizontal: "auto",
      gap: 6,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      width: 75,
      padding: 10,
    },
    buttonText: {
      alignSelf: "center",
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
  });
}
