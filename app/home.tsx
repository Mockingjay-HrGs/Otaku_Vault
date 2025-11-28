import MalApi from '@/components/MalApi';
import { Button } from '@react-navigation/elements';
import React, { useState } from "react";
import { Text, View } from "react-native";



export default function Home() {
  const [selected, setSelected] = useState<"topAnime" | "topManga">("topAnime");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, margin: 16 }}>
        <Button onPress={() => setSelected("topAnime")}>Top Anime</Button>
        <Button onPress={() => setSelected("topManga")}>Top Manga</Button>
      </View>
      <MalApi page={selected}/>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
