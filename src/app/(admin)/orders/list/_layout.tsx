import { Stack } from "expo-router";

export default function OrderListNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
