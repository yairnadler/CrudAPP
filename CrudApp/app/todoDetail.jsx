import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function TodoDetail({ route, navigation }) {
  const { todo } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.description}>{todo.description}</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
});
