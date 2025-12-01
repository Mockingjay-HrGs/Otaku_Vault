import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';






export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: 'Otaku Vault',
          headerShown: true
        }}
      />
    </Stack>
  );
}

