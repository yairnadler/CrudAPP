import {
  StyleSheet,
  Appearance,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { data } from "@/data/todos";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "@/context/ThemeContext";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Index() {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(todos.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [data]);

  if (!data) {
    return null;
  }

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    };

    storeData();
  }, [todos]);

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
    setTodos((prevTodos) => [todo, ...prevTodos]);
    setText("");
    setCount(count + 1);
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
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    console.log(`${item.title} has been removed from your todo list`);
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
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </Container>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
  });
}
