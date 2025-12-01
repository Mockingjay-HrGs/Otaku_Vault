import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Otaku Vault',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="anime"
        options={{
          title: 'Anime Search',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="manga"
        options={{
          title: 'Manga Search',
          headerShown: true
        }}
      />
    </Stack>
  );
}

