import {
  StyleSheet,
  Appearance,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { data } from "@/data/todos";
import React, { useState } from "react";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  const [text, setText] = useState("");
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [count, setCount] = useState(todos.length);

  const handleAddTodo = (input) => {
    if (input === "") {
      console.log("empty todo won't be added!");
      return;
    }
   
    const todo = {
      id: count + 1,
      title: input,
      completed: false,
    };
    setTodos((prevTodos) => [todo,...prevTodos]);
    setText("");
    setCount(count + 1)
    console.log(`${input} has been added`);
  };

  const handleCheckboxClicked = (item) => {
    item.completed = !item.completed;
    setTodos([...todos]);
    if (item.completed) {
      console.log(`${item.title} is done!`);
    } else {
      console.log(`${item.title} needs more work..`);
    }
  };

  const handleDeleteItemClicked = (item) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== item.id));
    console.log(`${item.title} has been removed from your todo list`)
  };

  return (
    <Container style={styles.contentContainer}>
      <TodoInput
        text={text}
        setText={setText}
        handleAddTodo={handleAddTodo}
        theme={theme}
        colorScheme={colorScheme}
      />
      <TodoList
        todos={todos}
        handleCheckboxClicked={handleCheckboxClicked}
        handleDeleteItemClicked={handleDeleteItemClicked}
        theme={theme}
        colorScheme={colorScheme}
      />
    </Container>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
  });
}
