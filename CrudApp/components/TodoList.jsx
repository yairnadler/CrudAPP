import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import TodoItem from "@/components/TodoItem";
import Animated, {LinearTransition} from 'react-native-reanimated'

export default function TodoList({
  todos,
  handleCheckboxClicked,
  handleDeleteItemClicked,
  theme,
  colorScheme,
}) {
  const styles = createStyles(theme, colorScheme);
  const separatorComp = <View style={styles.separator} />;

  return (
    <Animated.FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={separatorComp}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode='on-drag'
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          handleCheckboxClicked={handleCheckboxClicked}
          handleDeleteItemClicked={handleDeleteItemClicked}
          theme={theme}
          colorScheme={colorScheme}
        />
      )}
    />
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    contentContainer: {
      width: "100%",
      paddingTop: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    separator: {
      height: 0.5,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 15,
    },
  });
}
