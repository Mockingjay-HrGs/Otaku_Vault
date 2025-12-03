import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'O',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="anime"
        options={{
          title: 'Anime Search',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="anime/[id]"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  
  );
}

