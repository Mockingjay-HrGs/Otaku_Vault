import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';






export default function RootLayout() {

  return (
    <View>
      <Stack>
        <Tabs>
          <Tabs.Screen
            name="home"
            options={{
              title: 'home'
            }}
          />
        </Tabs>
      </Stack>
    </View>
  );
}

