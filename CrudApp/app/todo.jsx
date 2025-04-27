import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function TodoDetail() {
  const route = useRoute();
  const { todo } = route.params;

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo Not Found</Text>
      </View>
    );
  }

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
