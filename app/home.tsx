import MalApi from '@/components/MalApi';
import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from '@/components/styles';

export default function Home() {
  const [selected, setSelected] = useState<"topAnime" | "topManga">("topAnime");

  return (
    <>
      <View style={styles.buttonsRow}>
        <Button title="Top Anime" onPress={() => setSelected("topAnime")} />
        <View style={{ width: 12 }} />
        <Button title="Top Manga" onPress={() => setSelected("topManga")} />
      </View>
      <MalApi page={selected} />
      <Text style={styles.centerText}>Edit app/index.tsx to edit this screen.</Text>
      
      </>
  );
}
