import MalApi from '@/components/MalApi';
import styles from '@/components/styles';
import { Link } from 'expo-router';
import React, { useState } from "react";
import { Button, View } from "react-native";

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

      <Link href="/anime">Go to Anime Search</Link>
      
      </>
  );
}
