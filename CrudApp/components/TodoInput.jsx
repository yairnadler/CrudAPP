import React from "react";
import { TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TodoInput({
  text,
  setText,
  handleAddTodo,
  theme,
  colorScheme,
}) {
  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.textInputRow}>
      <TextInput
        style={styles.textInput}
        spellCheck={true}
        placeholder="Enter new TODO"
        placeholderTextColor={"grey"}
        onChangeText={(newText) => setText(newText)}
        value={text}
      />
      <TouchableOpacity
        style={styles.sendIcon}
        onPress={() => handleAddTodo(text)}
      >
        <Ionicons
          name="send"
          size={20}
          color={colorScheme === "dark" ? "papayawhip" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    textInputRow: {
        backgroundColor: theme.background,
        flexDirection: "row",
        width: "93%",
        maxWidth: 600,
        borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
        marginHorizontal: "auto",
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
      },
      textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: "auto",
        marginLeft: 15,
        color: theme.text,
      },
    sendIcon: {
      marginVertical: "auto",
      paddingRight: 15,
    },
  });
}
