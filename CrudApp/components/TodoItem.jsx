import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TodoItem({
  item,
  handleCheckboxClicked,
  handleDeleteItemClicked,
  theme,
  colorScheme,
}) {
  const navigation = useNavigation();
  const styles = createStyles(theme, colorScheme);

  const handlePress = () => {
    navigation.navigate("TodoDetail", { todo: item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.row}>
        <Text
          style={[styles.listItemText, item.completed && styles.strikeThrough]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <TouchableOpacity
          style={styles.checkboxIcon}
          onPress={() => handleCheckboxClicked(item)}
        >
          <Ionicons
            name={item.completed ? "checkbox-outline" : "square-outline"}
            size={20}
            color={colorScheme === "dark" ? "papayawhip" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxIcon}
          onPress={() => handleDeleteItemClicked(item)}
        >
          <Ionicons
            name={"trash"}
            size={20}
            color={colorScheme === "dark" ? "papayawhip" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 50,
      marginBottom: 10,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      marginHorizontal: "auto",
    },
    listItemText: {
      flex: 1,
      fontSize: 18,
      marginVertical: "auto",
      marginLeft: 15,
      color: theme.text,
    },
    strikeThrough: {
      textDecorationLine: "line-through",
    },
    checkboxIcon: {
      paddingRight: 15,
      marginVertical: "auto",
    },
  });
}
