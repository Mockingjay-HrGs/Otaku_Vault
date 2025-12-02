import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '@/components/styles';
import { Button, View } from "react-native";
import { useState } from "react";

export default function AnimeSearch() {
      const [selected, setSelected] = useState<"Anime" | "Manga">("Anime");
    
    return (
        <>
        
        <SafeAreaView style={styles.container}>
            <SearchBar page={selected}/>
            <View style={styles.buttonsRow}>
                <Button title="Anime" onPress={() => setSelected("Anime")} />
                <View style={{ width: 12 }} />
                <Button title="Manga" onPress={() => setSelected("Manga")} />
            </View>
        </SafeAreaView>
        </>
    );
}