import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Todo List" }}
        />
        <Stack.Screen
          name="todo" // Dynamic route for Todo Detail
          options={{ title: "Todo Details" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
